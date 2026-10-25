import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import NuevoProducto from "./NuevoProducto";
import NuevaCategoria from "./NuevaCategoria";
import NuevoUsuario from "./NuevoUsuario";
import UsuariosAdmin from "./UsuariosAdmin";
import ProductosAdmin from "./ProductosAdmin";
import CategoriasAdmin from "./CategoriasAdmin";
import PerfilAdmin from "./PerfilAdmin";
import BoletaAdmin from "./BoletaAdmin";
import ReportesAdmin from "./ReportesAdmin";
import PanelAdmin from "./PanelAdmin";
import { obtenerProductos, guardarProductos } from "../../assets/js/Datos";
import { obtenerCategorias, guardarCategorias } from "../../assets/js/categorias";
import { obtenerUsuarios, guardarUsuarios, buscarUsuario, guardarSesion, obtenerSesion } from "../../assets/js/usuarios";
import { agregarProducto, obtenerCarrito } from "../../assets/js/carrito";
import { guardarPedidos } from "../../assets/js/pedidos";

beforeEach(() => {
    localStorage.clear();
    Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
        configurable: true,
        value: function () { this.setAttribute("open", ""); },
    });
    Object.defineProperty(HTMLDialogElement.prototype, "close", {
        configurable: true,
        value: function () { this.removeAttribute("open"); },
    });
});

afterEach(() => vi.restoreAllMocks());

function mostrar(elemento, ruta, patron) {
    return render(
        <MemoryRouter initialEntries={[ruta]}>
            <Routes>
                <Route path={patron || ruta} element={elemento} />
                <Route path="/admin/productos" element={<p>Listado de productos</p>} />
                <Route path="/admin/categorias" element={<p>Listado de categorías</p>} />
                <Route path="/admin/usuarios" element={<p>Listado de administradores</p>} />
            </Routes>
        </MemoryRouter>
    );
}

describe("Administración", () => {
    it("guarda una categoría y evita repetir su código", async () => {
        const user = userEvent.setup();
        mostrar(<NuevaCategoria />, "/admin/categorias/nueva");
        await user.type(screen.getByLabelText("Nombre"), "Prueba");
        await user.type(screen.getByLabelText("Código de categoría"), "tortas-cuadradas");
        await user.click(screen.getByRole("button", { name: "Guardar categoría" }));
        expect(screen.getByRole("alert")).toHaveTextContent("no debe estar repetida");
        await user.clear(screen.getByLabelText("Código de categoría"));
        await user.type(screen.getByLabelText("Código de categoría"), "prueba");
        await user.click(screen.getByRole("button", { name: "Guardar categoría" }));
        expect(obtenerCategorias()).toHaveLength(9);
        expect(screen.getByText("Listado de categorías")).toBeInTheDocument();
    });

    it("edita el nombre de una categoría conservando el código de sus productos", async () => {
        const user = userEvent.setup();
        mostrar(<NuevaCategoria />, "/admin/categorias/1/editar", "/admin/categorias/:id/editar");
        expect(screen.getByLabelText("Código de categoría")).toHaveAttribute("readonly");
        await user.clear(screen.getByLabelText("Nombre"));
        await user.type(screen.getByLabelText("Nombre"), "Tortas medianas");
        await user.click(screen.getByRole("button", { name: "Guardar categoría" }));
        expect(obtenerCategorias()[0]).toMatchObject({ nombre: "Tortas medianas", valor: "tortas-cuadradas" });
    });

    it("impide eliminar categorías con productos y permite eliminar una vacía", async () => {
        const user = userEvent.setup();
        guardarCategorias([...obtenerCategorias(), { id: 99, nombre: "Vacía", valor: "vacia" }]);
        mostrar(<CategoriasAdmin />, "/categorias");
        await user.click(screen.getAllByRole("button", { name: "Eliminar", exact: true })[0]);
        expect(screen.getByRole("alert")).toHaveTextContent("tiene productos");
        await user.click(screen.getByRole("button", { name: "Entendido" }));
        await user.type(screen.getByRole("searchbox"), "Vacía");
        await user.click(screen.getAllByRole("button", { name: "Eliminar", exact: true })[0]);
        await user.click(screen.getByRole("dialog").querySelector("button:last-child"));
        expect(obtenerCategorias().some((item) => item.id === 99)).toBe(false);
    });

    it("crea un producto con foto, tamaño y descripción y permite agregarlo al carrito", async () => {
        const user = userEvent.setup();
        mostrar(<NuevoProducto />, "/admin/productos/nuevo");
        await user.type(screen.getByLabelText("Nombre"), "Producto prueba");
        await user.type(screen.getByLabelText("Precio"), "9000");
        await user.type(screen.getByLabelText("Stock disponible"), "3");
        await user.selectOptions(screen.getByLabelText("Categoría"), "postres-individuales");
        await user.upload(screen.getByLabelText("Foto del producto"), new File(["foto"], "foto.png", { type: "image/png" }));
        await user.type(screen.getByLabelText("Tamaño o presentación"), "Por unidad");
        await user.type(screen.getByLabelText("Descripción"), "Postre de prueba");
        await waitFor(() => expect(screen.getByAltText("Vista previa del producto")).toBeInTheDocument());
        expect(screen.getByLabelText("Foto del producto").files).toHaveLength(1);
        // jsdom no valida los archivos como un navegador real.
        fireEvent.submit(screen.getByRole("button", { name: "Guardar producto" }).closest("form"));
        const nuevo = obtenerProductos().find((item) => item.nombre === "Producto prueba");
        expect(nuevo).toMatchObject({ precio: 9000, stock: 3, tamano: "Por unidad", descripcion: "Postre de prueba" });
        expect(nuevo.imagen).toMatch(/^data:image\/png;base64,/);
        agregarProducto(nuevo.id, 2);
        expect(obtenerCarrito()[0].cantidad).toBe(2);
    });

    it("edita un producto sin exigir otra foto y refleja el nuevo precio en el carrito", async () => {
        const user = userEvent.setup();
        agregarProducto(1, 1);
        mostrar(<NuevoProducto />, "/admin/productos/1/editar", "/admin/productos/:id/editar");
        await user.clear(screen.getByLabelText("Precio"));
        await user.type(screen.getByLabelText("Precio"), "46000");
        await user.click(screen.getByRole("button", { name: "Guardar producto" }));
        expect(obtenerProductos()[0].precio).toBe(46000);
        expect(obtenerCarrito()[0].precio).toBe(46000);
    });

    it("cancela la eliminación de producto y lo elimina al confirmar", async () => {
        const user = userEvent.setup();
        agregarProducto(1, 1);
        mostrar(<ProductosAdmin />, "/productos");
        await user.click(screen.getAllByRole("button", { name: "Eliminar", exact: true })[0]);
        await user.click(screen.getByRole("button", { name: "Cancelar" }));
        expect(obtenerProductos()).toHaveLength(16);
        await user.click(screen.getAllByRole("button", { name: "Eliminar", exact: true })[0]);
        await user.click(screen.getByRole("dialog").querySelector("button:last-child"));
        expect(obtenerProductos()).toHaveLength(15);
        expect(obtenerCarrito()).toHaveLength(0);
    });

    it("guarda un administrador que puede iniciar sesión y rechaza un correo repetido", async () => {
        const user = userEvent.setup();
        mostrar(<NuevoUsuario />, "/admin/usuarios/nuevo");
        await user.type(screen.getByLabelText("Nombre completo"), "Prueba Admin");
        await user.type(screen.getByLabelText("Correo electrónico"), "admin@milsabores.cl");
        await user.type(screen.getByLabelText("Contraseña"), "prueba123");
        await user.click(screen.getByRole("button", { name: "Guardar administrador" }));
        expect(screen.getByRole("alert")).toHaveTextContent("ya está registrado");
        await user.clear(screen.getByLabelText("Correo electrónico"));
        await user.type(screen.getByLabelText("Correo electrónico"), "nuevo@example.com");
        await user.click(screen.getByRole("button", { name: "Guardar administrador" }));
        expect(buscarUsuario("nuevo@example.com", "prueba123").rol).toBe("admin");
    });

    it("actualiza nombre y correo sin cambiar la contraseña del administrador", async () => {
        const user = userEvent.setup();
        guardarSesion(obtenerUsuarios()[0]);
        mostrar(<PerfilAdmin />, "/perfil");
        expect(screen.queryByLabelText("Contraseña actual")).not.toBeInTheDocument();
        await user.clear(screen.getByLabelText("Nombre completo"));
        await user.type(screen.getByLabelText("Nombre completo"), "Administrador actualizado");
        await user.clear(screen.getByLabelText("Correo electrónico"));
        await user.type(screen.getByLabelText("Correo electrónico"), "actualizado@example.com");
        await user.click(screen.getByRole("button", { name: "Guardar cambios" }));
        expect(obtenerSesion()).toMatchObject({ nombre: "Administrador actualizado", email: "actualizado@example.com" });
        expect(buscarUsuario("actualizado@example.com", "admin123").nombre).toBe("Administrador actualizado");
    });

    it("muestra el precio histórico de la boleta aunque cambie el catálogo", () => {
        guardarPedidos([{
            id: "prueba", numero: "PED-PRUEBA", fecha: "25-10-2026", cliente: "Cliente",
            productos: [{ id: 1, nombre: "Torta", precio: 45000, cantidad: 2 }],
            estado: "pendiente", total: 90000,
        }]);
        guardarProductos(obtenerProductos().map((item) => ({ ...item, precio: 1 })));
        mostrar(<BoletaAdmin />, "/admin/pedidos/prueba/boleta", "/admin/pedidos/:id/boleta");
        expect(screen.getByText("$45.000")).toBeInTheDocument();
        expect(screen.getByText("Total: $90.000")).toBeInTheDocument();
    });

    it("mantiene el formulario y los productos si falla el guardado", async () => {
        const user = userEvent.setup();
        mostrar(<NuevoProducto />, "/admin/productos/1/editar", "/admin/productos/:id/editar");
        vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("Sin espacio"); });
        await user.click(screen.getByRole("button", { name: "Guardar producto" }));
        expect(screen.getByRole("alert")).toHaveTextContent("No se pudo guardar");
        expect(obtenerProductos()).toHaveLength(16);
        expect(screen.getByLabelText("Nombre")).toHaveValue("Torta Cuadrada de Chocolate");
    });
    it("ordena los más vendidos por unidades, excluye cancelados y respeta las fechas", () => {
        const pedido = { cliente: "Cliente", fecha: "25-10-2026", fechaRegistro: "2026-10-25", pago: "pagado", estado: "pendiente", total: 3000 };
        guardarPedidos([
            { ...pedido, id: "uno", productos: [{ id: 1, nombre: "Chocolate", cantidad: 2, precio: 1000 }, { id: 2, nombre: "Vainilla", cantidad: 3, precio: 500 }] },
            { ...pedido, id: "dos", fechaRegistro: "2026-10-24", productos: [{ id: 1, nombre: "Chocolate", cantidad: 3, precio: 900 }] },
            { ...pedido, id: "tres", estado: "cancelado", productos: [{ id: 2, nombre: "Vainilla", cantidad: 100, precio: 500 }] },
            { ...pedido, id: "cuatro", pago: "sin-confirmar", productos: [{ id: 2, nombre: "Vainilla", cantidad: 100, precio: 500 }] },
        ]);
        mostrar(<ReportesAdmin />, "/reportes");
        const tabla = screen.getByRole("table", { name: "Productos más vendidos" });
        let filas = within(tabla).getAllByRole("row");
        expect(filas[1]).toHaveTextContent("Chocolate");
        expect(within(filas[1]).getByText("5")).toBeInTheDocument();
        expect(filas[1]).toHaveTextContent("$4.700");
        fireEvent.change(screen.getByLabelText("Desde"), { target: { value: "2026-10-25" } });
        filas = within(tabla).getAllByRole("row");
        expect(filas[1]).toHaveTextContent("Vainilla");
        expect(within(filas[1]).getByText("3")).toBeInTheDocument();
    });

    it("muestra en inicio stocks de cero a cinco, ordenados, y enlaza su edición", () => {
        guardarProductos([
            { id: 1, nombre: "Agotado prueba", stock: 0 },
            { id: 2, nombre: "Bajo prueba", stock: 5 },
            { id: 3, nombre: "Normal prueba", stock: 6 },
        ]);
        mostrar(<PanelAdmin />, "/panel");
        const tabla = screen.getByRole("table", { name: "Stock crítico" });
        const filas = within(tabla).getAllByRole("row");
        expect(filas).toHaveLength(3);
        expect(filas[1]).toHaveTextContent("Agotado prueba");
        expect(filas[2]).toHaveTextContent("Bajo prueba");
        expect(within(tabla).queryByText("Normal prueba")).not.toBeInTheDocument();
        expect(within(filas[1]).getByRole("link", { name: "Actualizar stock" })).toHaveAttribute("href", "/admin/productos/1/editar");
    });

    it("protege al administrador activo y elimina otra cuenta solo al confirmar", async () => {
        const user = userEvent.setup();
        guardarSesion(obtenerUsuarios()[0]);
        guardarUsuarios([...obtenerUsuarios(), { nombre: "Administrador prueba", email: "otro@example.com", password: "prueba123", rol: "admin" }]);
        mostrar(<UsuariosAdmin />, "/usuarios");
        expect(screen.getAllByRole("button", { name: "Eliminar", exact: true })[0]).toBeDisabled();
        await user.click(screen.getAllByRole("button", { name: "Eliminar", exact: true })[1]);
        await user.click(screen.getByRole("button", { name: "Cancelar" }));
        expect(buscarUsuario("otro@example.com", "prueba123")).toBeDefined();
        await user.click(screen.getAllByRole("button", { name: "Eliminar", exact: true })[1]);
        await user.click(screen.getByRole("dialog").querySelector("button:last-child"));
        expect(buscarUsuario("otro@example.com", "prueba123")).toBeUndefined();
        expect(obtenerUsuarios().filter((item) => item.rol === "cliente")).toHaveLength(2);
        expect(obtenerSesion().email).toBe("admin@milsabores.cl");
    });

});

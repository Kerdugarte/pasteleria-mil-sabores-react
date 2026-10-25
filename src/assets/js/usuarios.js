export const usuarios = [
    {
        nombre: "Administrador",
        email: "admin@milsabores.cl",
        password: "admin123",
        rol: "admin",
    },
    {
        nombre: "Kerly",
        email: "kerly@gmail.com",
        password: "1234",
        rol: "cliente",
    },
    {
        nombre: "Suimei",
        email: "suimei@gmail.com",
        password: "1234",
        rol: "cliente",
    },
];

export function buscarUsuario(email, password) {
    return obtenerUsuarios().find(
        (usuario) =>
            usuario.email.toLowerCase() === email.trim().toLowerCase() &&
            usuario.password === password
    );
}

export function guardarSesion(usuario) {
    const sesion = {
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
    };

    localStorage.setItem("usuarioActivo", JSON.stringify(sesion));
}

export function obtenerSesion() {
    try {
        return JSON.parse(localStorage.getItem("usuarioActivo"));
    } catch {
        return null;
    }
}

export function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");
}


export function obtenerUsuarios() {
    try {
        const guardados = JSON.parse(localStorage.getItem("usuarios"));
        return Array.isArray(guardados) ? guardados : usuarios;
    } catch {
        return usuarios;
    }
}

export function guardarUsuarios(actualizados) {
    localStorage.setItem("usuarios", JSON.stringify(actualizados));
}

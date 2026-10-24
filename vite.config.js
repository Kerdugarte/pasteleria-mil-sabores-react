import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: [
        'src/components/TarjetaProducto.jsx',
        'src/components/FiltroProductos.jsx',
        'src/components/Paginacion.jsx',
      ],
    },
  },
});

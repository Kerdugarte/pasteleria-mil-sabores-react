import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    // Habilita variables globales como 'describe', 'test', 'expect' sin necesidad de importarlas
    globals: true,
    // Simula el entorno del navegador en Node.js
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/main.jsx',
        '**/*.d.ts',
      ],
      // Opcional: Forzar un mínimo de cobertura
      thresholds: {
        lines: 75,
        functions: 75,
        branches: 60,
        statements: 75,
      },
    },
    // Archivo que se ejecutará antes de cada test para preparar el entorno
    setupFiles: './src/setupTests.js',
  },
});



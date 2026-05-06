//import { defineConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    include: ['tests/**/*.{test,spec}.ts', 'tests/**/*.test.tsx'],
    exclude: ['test_e2e/**', '**/test_e2e/**'],
    environment: 'jsdom',
    setupFiles: [
      "./src/setupTests.ts",
      "./tests/integration/setup/testSetup.ts",
    ],
    globals: true,
  },
})

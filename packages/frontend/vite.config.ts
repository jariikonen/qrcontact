import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/qrcontact/',
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './testSetup.ts',
    dir: 'src/',
  },
});

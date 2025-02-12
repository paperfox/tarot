// import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svelteTesting } from '@testing-library/svelte/vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [react(), svelte(), svelteTesting()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.js'],
  },
  // build: {
  //   commonjsOptions: { include: [] },
  // },
  // optimizeDeps: {
  //   disabled: false,
  // },
});

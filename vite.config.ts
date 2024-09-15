import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
// @ts-ignore
import tailwindcss from 'tailwindcss';
// @ts-ignore
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
      ],
    },
  },
  server: {
    open: true,
    port: 3000,
  },
  build: {
    sourcemap: true,
    outDir: 'dist',
  },
});
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import generouted from '@generouted/react-router/plugin';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    generouted({
      source: {
        routes: './src/pages/**/[\\w[-]*.{jsx,tsx}',
        modals: './src/pages/**/[+]*.{jsx,tsx}',
      },
      output: './src/router.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      hooks: '/src/hooks',
      lib: '/src/lib',
      '@pages': '/src/pages',
      stores: '/src/stores',
      styles: '/src/styles',
      types: '/src/types',
      utils: '/src/utils',
      apis: '/src/apis',
    },
  },
});

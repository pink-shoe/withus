import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import generouted from '@generouted/react-router/plugin';
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
  server: {
    proxy: {
      '/openvidu/api': {
        target: 'http://localhost:4443',
        changeOrigin: true,
        secure: false,
        // ws:true,
        // rewrite:(path=>path.replace())
      },
    },
  },
  resolve: {
    alias: {
      '@src': '/src',
      '@components': '/src/components',
      hooks: '/src/hooks',
      lib: '/src/lib',
      '@pages': '/src/pages',
      stores: '/src/stores',
      styles: '/src/styles',
      types: '/src/types',
      utils: '/src/utils',
      apis: '/src/apis',
      common: '/src/components/common',
      router: '/src/router.ts',
    },
  },
});

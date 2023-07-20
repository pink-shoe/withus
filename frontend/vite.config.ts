import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import generouted from '@generouted/react-router/plugin';
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({ plugins: [react(), generouted()] });

resolve: {
  alias: [{ find: '@', replacement: resolve(__dirname, './src') }];
}

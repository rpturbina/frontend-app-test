import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      components: `${path.resolve(__dirname, './src/components/')}`,
      pages: `${path.resolve(__dirname, './src/pages/')}`,
      styles: `${path.resolve(__dirname, './src/styles/')}`,
    },
  },
  plugins: [react()],
});

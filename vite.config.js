import { defineConfig } from 'vite';
// eslint-disable-next-line
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});

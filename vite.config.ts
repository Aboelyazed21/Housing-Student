import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ✅ لازم تضيف base باسم الريبو على GitHub
export default defineConfig({
  base: '/housing-student/',
  plugins: [react()],
});

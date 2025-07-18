import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ✅ أضف base: '/Housing-Student/' عشان GitHub Pages يقرأ المسار صح
export default defineConfig({
  base: '/Housing-Student/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

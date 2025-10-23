import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ لازم تضيف base بنفس اسم الريبو على GitHub (بالحروف نفسها)
export default defineConfig({
  base: '/Housing-Student/', // <-- تأكد إن الاسم مطابق تمامًا لاسم الريبو في GitHub
  plugins: [react()],
})

import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/assets/*': resolve(__dirname, './src/assets/*'),
      '@/components/*': resolve(__dirname, './src/components/*'),
      '@/hooks/*': resolve(__dirname, './src/hooks/*'),
      '@/layouts/*': resolve(__dirname, './src/layouts/*'),
      '@/pages/*': resolve(__dirname, './src/pages/*'),
      '@/utils/*': resolve(__dirname, './src/utils/*'),
    },
  },
})

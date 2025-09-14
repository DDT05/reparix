import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Reduce bundle size in production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'animation-libs': ['framer-motion', 'react-spring'],
          'ui-libs': ['lucide-react', 'styled-components'],
          'supabase': ['@supabase/supabase-js']
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  base: './',
  server: {
    hmr: {
      overlay: false
    }
  }
});
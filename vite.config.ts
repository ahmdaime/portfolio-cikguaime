import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        // Enable minification
        minify: 'esbuild',
        // Target modern browsers for smaller bundle
        target: 'es2020',
        // Chunk size warning limit
        chunkSizeWarningLimit: 500,
        rollupOptions: {
          output: {
            // Manual chunks for better code splitting
            manualChunks: {
              // Vendor chunks - separate heavy libraries
              'vendor-react': ['react', 'react-dom', 'react-router-dom'],
              'vendor-framer': ['framer-motion'],
              // Separate lucide icons to allow tree-shaking
              'vendor-icons': ['lucide-react'],
              // Embla carousel
              'vendor-carousel': ['embla-carousel-react', 'embla-carousel-autoplay'],
            },
          },
        },
      },
});

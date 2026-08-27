import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: [
      '@mui/material',
      '@emotion/react',
      '@emotion/styled',
    ],
    exclude: ['@mui/icons-material'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@mui') || id.includes('@emotion')) {
              return 'vendor_mui';
            }
            return 'vendor';
          }
        },
      },
    },
  },
  server: {
    open: false,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    css: false,
    pool: 'forks',
    testTimeout: 15000,
    server: {
      deps: {
        inline: [/@mui/, /@emotion/],
      },
    },
    ssr: {
      noExternal: [/@mui/],
    },
    isolate: false,
  },
});

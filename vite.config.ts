import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        chunkSizeWarningLimit: 2000, // Увеличить лимит до 1000 КБ
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ['react', 'react-dom'],
                },
            },
        },
    },
});

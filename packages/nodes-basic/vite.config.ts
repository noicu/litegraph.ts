import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: "dist",
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            formats: ["es", "umd"],
            name: 'nodes-basic',
            fileName: (format) => `nodes-basic.${format}.js`
        },
    }
});

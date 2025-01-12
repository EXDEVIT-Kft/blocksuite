import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const external = [/^@radix-ui/, /^@blocksuite/, /^lit$/];

export default defineConfig({
  plugins: [],
  build: {
    target: 'es2022',
    outDir: 'dist',
    minify: false,
    sourcemap: true,
    lib: {
      entry: {
        lit: resolve(__dirname, 'src/index.ts'),
      },
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external,
    },
  },
});

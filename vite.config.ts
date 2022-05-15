/// <reference types="vitest" />

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

function resolveSrc(_path) {
  // @ts-ignore
  return path.resolve(__dirname, _path);
}

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolveSrc('./src'),
      components: resolveSrc('./src/components'),
      views: resolveSrc('./src/views'),
      router: resolveSrc('./src/router'),
      assets: resolveSrc('./src/assets'),
      node_modules: resolveSrc('./node_modules'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  test: {
    /* for example, use global to avoid globals imports (describe, test, expect): */
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.spec.ts'],
    exclude: ['node_modules', 'dist'],
    coverage: {
      all: true,
    },
  },
});

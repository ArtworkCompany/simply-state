import { defineConfig } from 'tsup';

export default defineConfig({
  name: 'simply-state',
  platform: 'browser',
  entry: ['src/index.ts'],
  treeshake: true,
  dts: true,
  clean: true,
  minify: true,
  sourcemap: true,
  format: ['esm', 'cjs'],
});

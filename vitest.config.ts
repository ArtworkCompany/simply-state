import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['./test/**/*.(spec|test).[jt]s?(x)'],
    alias: {
      'simply-state': './src/index.ts',
    },
    deps: {
      interopDefault: true,
    },
  },
});

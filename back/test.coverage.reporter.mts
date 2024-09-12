import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      reporter: [
        ['@vitest/custom-coverage-reporter', { someOption: true }],

        '/absolute/path/to/custom-reporter.cjs',
      ],
    },
  },
});

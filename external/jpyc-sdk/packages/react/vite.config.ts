import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    projects: [
      {
        test: {
          name: { label: 'utils', color: 'blue' },
          environment: 'node',
          include: ['src/**/*.test.ts'],
        },
      },
      {
        test: {
          name: { label: 'hooks', color: 'green' },
          environment: 'happy-dom',
          include: ['src/**/*.test.tsx'],
        },
      },
    ],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
    },
  },
});

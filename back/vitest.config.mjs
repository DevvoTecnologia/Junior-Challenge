// vitest.config.ts
import { config } from 'dotenv';
import { defineConfig } from 'vitest/config';
export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        clearMocks: true,
        env: {
            ...config({ path: './.testing.env' }).parsed,
        },
        coverage: {
            provider: 'v8',
            include: ['src/**/*.ts'],
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/',
                'dist/',
                'src/database.ts',
                'src/swagger.ts',
                'src/server.ts',
            ],
            all: true,
        },
    },
});

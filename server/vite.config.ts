/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    exclude: [
      "build",
      "node_modules",
    ]
  },
});

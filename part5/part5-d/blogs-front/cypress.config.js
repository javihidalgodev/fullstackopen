import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    baseUrl: 'http://localhost:2024',
    env: {
      BACKEND: 'http://localhost:2024/api'
    }
  },
});

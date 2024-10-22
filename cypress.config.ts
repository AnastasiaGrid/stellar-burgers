import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack'
    }
  },
  env: {
    BURGER_API_URL: 'https://norma.nomoreparties.space/api'
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:5173',
    fixturesFolder: 'cypress/fixtures'
  }
});

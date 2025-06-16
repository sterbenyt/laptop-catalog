const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',  // адреса твого React-додатку
        specPattern: 'cypress/e2e/**/*.cy.{js,ts}',  // шлях до тестів
    },
});

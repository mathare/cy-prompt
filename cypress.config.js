const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    experimentalPromptCommand: true,
    projectId: 'rchav9',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

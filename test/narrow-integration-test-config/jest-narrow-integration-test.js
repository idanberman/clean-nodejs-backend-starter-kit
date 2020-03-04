const fs = require('fs');
const globalJestConfig = JSON.parse(fs.readFileSync('./package.json')).jest;

module.exports = {
  ...globalJestConfig,
  rootDir: '..',
  setupFiles: [
    ...globalJestConfig.setupFiles,
    './test/integration-setup-file.ts',
  ],
  testRegex: '.test.integration.ts$',
};

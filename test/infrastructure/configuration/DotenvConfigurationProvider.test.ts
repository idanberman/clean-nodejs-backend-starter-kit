import dotenv = require('dotenv');
import { ApplicationFactory } from 'src/infrastructure/core/ApplicationFactory';

describe('DotenvConfigurationProvider.class', () => {
  describe('provide().method', () => {
    it('should provide configuration from dotenv file', async () => {
      const factory = new ApplicationFactory();
      const application = await factory.uninitializedApp();
      process.env.DATABASE_DB_NAME = 'dbname';
      process.env.DATABASE_USERNAME = 'dbuser';
      process.env.DATABASE_PASSWORD = 'dbpassword';

      const configuration = application.getConfiguration();
      expect(configuration.database.database).toEqual('dbname');
      expect(configuration.database.username).toEqual('dbuser');
      expect(configuration.database.password).toEqual('dbpassword');
    });
  });
});

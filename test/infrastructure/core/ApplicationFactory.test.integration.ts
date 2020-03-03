import { ApplicationFactory } from 'src/infrastructure/core';

describe('ApplicationFactory.class', () => {
  describe('productionApp.method', () => {
    it('should init ready application', async () => {
      const app = await ApplicationFactory.productionApp();
      expect(app.isInitialized).toBeTruthy();
      expect(app.isStarted).toBeTruthy();
    });
  });
});

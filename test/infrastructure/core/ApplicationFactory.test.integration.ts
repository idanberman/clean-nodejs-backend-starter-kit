import { ApplicationFactory } from 'src/infrastructure/core';

describe('ApplicationFactory.class', () => {
  describe('productionApp.method', () => {
    it('should init ready application', async () => {
      try {
        const app = await ApplicationFactory.productionApp();
      } catch (error) {
        // console.log(app.getConfiguration());

        throw error;
      }
      // expect(app.isInitialized).toBeTruthy();
      // expect(app.isStarted).toBeTruthy();
    });
  });
});

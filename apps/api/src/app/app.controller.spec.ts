import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getProducts', () => {
    it('should return products', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getProducts()[0].name).toEqual('Spanner');
    });
  });
});

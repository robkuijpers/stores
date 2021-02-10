import { Test } from '@nestjs/testing';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getProducts', () => {
    it('should return "Welcome to api!"', () => {
      expect(service.getProducts().length).toBe(6);
    });
  });
});

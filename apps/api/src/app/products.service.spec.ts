import { Test } from '@nestjs/testing';

import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = app.get<ProductsService>(ProductsService);
  });

  describe('get number of products', () => {
    it('should return number of products', () => {
      expect(service.findAll({}).length).toBe(9);
    });
  });
});

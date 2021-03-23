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

  describe('update product', () => {
    it('should update a product', () => {
      const op = {
        name: 'Test111',
        description: 'Description',
      };
      const np = service.update('1', op);
      expect(np.name).toEqual('Test111');
      expect(np.description).toEqual('Description');
      expect(np.category).toEqual('tools'), expect(np.code).toEqual('TBX-0026'), expect(np.rating).toEqual(3.7);
    });
  });
});

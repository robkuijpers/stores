import { Test } from '@nestjs/testing';
import { CategoriesService } from './categories.service';

describe('CatgoriesService', () => {
  let service: CategoriesService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [CategoriesService],
    }).compile();

    service = app.get<CategoriesService>(CategoriesService);
  });

  describe('get number of categories', () => {
    it('should return number of categories', () => {
      expect(service.getAll().length).toBe(9);
    });
  });
});

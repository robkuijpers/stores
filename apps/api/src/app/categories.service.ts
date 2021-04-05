import { Injectable } from '@nestjs/common';
import { Category } from './models';

@Injectable()
export class CategoriesService {
  private categories: Category[] = [
    {
      id: '1',
      name: 'Tools',
    },
    {
      id: '2',
      name: 'Paint',
    },
    {
      id: '3',
      name: 'Wood',
    },
  ];

  findAll(query: any): Category[] {
    return this.categories;
  }
}

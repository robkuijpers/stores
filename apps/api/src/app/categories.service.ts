import { Injectable } from '@nestjs/common';
import { Category } from './models';

@Injectable()
export class CategoriesService {
  private categories: Category[] = [
    {
      id: '1',
      name: 'tools',
    },
    {
      id: '2',
      name: 'paint',
    },
    {
      id: '3',
      name: 'wood',
    },
  ];

  findAll(query: any): Category[] {
    return this.categories;
  }
}

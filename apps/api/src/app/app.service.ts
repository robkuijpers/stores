import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getProducts() {
    return [
      {
        id: 1,
        name: 'Spanner',
        category: 'tools',
        code: 'TBX-0022',
        description: '15-inch steel blade hand saw',
        rating: 3.7,
      },
      {
        id: 2,
        name: 'Hammer',
        category: 'tools',
        code: 'TBX-0022',
        description: '15-inch steel blade hand saw',
        rating: 3.7,
      },
      {
        id: 3,
        name: 'Screw driver',
        category: 'tools',
        code: 'TBX-0022',
        description: '15-inch steel blade hand saw',
        rating: 3.7,
      },
      {
        id: 4,
        name: 'Paint brush',
        category: 'paint',
        code: 'TBX-0022',
        description: '15-inch steel blade hand saw',
        rating: 3.7,
      },
      {
        id: 5,
        name: 'Paint roller',
        category: 'paint',
        code: 'TBX-0022',
        description: '15-inch steel blade hand saw',
        rating: 3.7,
      },
      {
        id: 6,
        name: 'Paint',
        category: 'paint',
        code: 'TBX-0022',
        description: '15-inch steel blade hand saw',
        rating: 3.7,
      },
    ];
  }
}

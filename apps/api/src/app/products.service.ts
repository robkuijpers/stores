import { Injectable } from '@nestjs/common';
import { Product } from './models';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: '0',
      name: 'Spanner',
      category: '1',
      code: 'TBX-0023',
      description: 'none',
      rating: 3.7,
      images: [],
    },
    {
      id: '1',
      name: 'Hammer',
      category: '1',
      code: 'TBX-0026',
      description: 'none',
      rating: 3.7,
      images: [
        {
          name: 'hammer.jpg',
          type: 'image/jpeg',
          size: 17,
          base64:
            'data:image/jpeg;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/Z',
        },
      ],
    },
    {
      id: '2',
      name: 'Screw driver',
      category: '1',
      code: 'TBX-0028',
      description: 'none',
      rating: 3.7,
      images: [],
    },
    {
      id: '3',
      name: 'Paint brush',
      category: '2',
      code: 'TBX-0030',
      description: 'none',
      rating: 3.7,
      images: [],
    },
    {
      id: '4',
      name: 'Paint roller',
      category: '2',
      code: 'TBX-0032',
      description: 'none',
      rating: 3.7,
      images: [],
    },
    {
      id: '5',
      name: 'Paint',
      category: '2',
      code: 'TBX-0022',
      description: 'none',
      rating: 3.7,
      images: [],
    },
    {
      id: '6',
      name: 'Wrench',
      category: '3',
      code: 'TBC-0009',
      description: 'number 12 - 13',
      rating: 4.2,
      images: [],
    },
    {
      id: '7',
      name: 'Large spanner',
      category: '3',
      code: 'TBC-00200',
      description: 'Large spanner',
      rating: 3.9,
      images: [],
    },
    {
      id: '8',
      name: 'Battery loader',
      category: '3',
      code: 'TBC-0350',
      description: '15 Amp/h',
      rating: 3.9,
      images: [],
    },
  ];

  findAll(query: any): Product[] {
    return this.products;
  }

  findOne(id: string): Product {
    console.log('get product:', this.products[id]);
    return this.products[id];
  }

  add(product: Product): Product {
    product.id = '' + (this.products.length + 1);
    this.products.push(product);
    return product;
  }

  update(id: string, product: Product): Product {
    console.log('update product:', product);
    const orig = this.products.find((p) => p.id === id);
    if (orig) {
      return Object.assign(orig, product);
    }
    return null;
  }

  delete(id: string): number {
    const idx = this.products.findIndex((p) => p.id === id);
    if (idx >= 0) {
      this.products.splice(idx, 1);
      return idx;
    }
    return -1;
  }
}

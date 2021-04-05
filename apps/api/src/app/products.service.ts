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
      images: [],
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

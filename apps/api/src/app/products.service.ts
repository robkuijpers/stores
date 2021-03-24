import { Injectable } from '@nestjs/common';
import { Product } from './models';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: '0',
      name: 'Spanner',
      category: 'tools',
      code: 'TBX-0023',
      description: 'none',
      rating: 3.7,
    },
    {
      id: '1',
      name: 'Hammer',
      category: 'tools',
      code: 'TBX-0026',
      description: 'none',
      rating: 3.7,
    },
    {
      id: '2',
      name: 'Screw driver',
      category: 'tools',
      code: 'TBX-0028',
      description: 'none',
      rating: 3.7,
    },
    {
      id: '3',
      name: 'Paint brush',
      category: 'paint',
      code: 'TBX-0030',
      description: 'none',
      rating: 3.7,
    },
    {
      id: '4',
      name: 'Paint roller',
      category: 'paint',
      code: 'TBX-0032',
      description: 'none',
      rating: 3.7,
    },
    {
      id: '5',
      name: 'Paint',
      category: 'paint',
      code: 'TBX-0022',
      description: 'none',
      rating: 3.7,
    },
    {
      id: '6',
      name: 'Wrench',
      category: 'tools',
      code: 'TBC-0009',
      description: 'number 12 - 13',
      rating: 4.2,
    },
    {
      id: '7',
      name: 'Large spanner',
      category: 'tools',
      code: 'TBC-00200',
      description: 'Large spanner',
      rating: 3.9,
    },
    {
      id: '8',
      name: 'Battery loader',
      category: 'tools',
      code: 'TBC-0350',
      description: '15 Amp/h',
      rating: 3.9,
    },
  ];

  findAll(query: any): Product[] {
    return this.products;
  }

  findOne(id: string): Product {
    return this.products[id];
  }

  add(product: Product): Product {
    product.id = '' + (this.products.length + 1);
    this.products.push(product);
    return product;
  }

  update(id: string, product: Product): Product {
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

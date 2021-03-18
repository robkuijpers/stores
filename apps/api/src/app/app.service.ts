import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private products = [
    {
      id: 1,
      name: 'Spanner',
      category: 'tools',
      code: 'TBX-0023',
      description: 'none',
      rating: 3.7,
    },
    {
      id: 2,
      name: 'Hammer',
      category: 'tools',
      code: 'TBX-0026',
      description: 'none',
      rating: 3.7,
    },
    {
      id: 3,
      name: 'Screw driver',
      category: 'tools',
      code: 'TBX-0028',
      description: 'none',
      rating: 3.7,
    },
    {
      id: 4,
      name: 'Paint brush',
      category: 'paint',
      code: 'TBX-0030',
      description: 'none',
      rating: 3.7,
    },
    {
      id: 5,
      name: 'Paint roller',
      category: 'paint',
      code: 'TBX-0032',
      description: 'none',
      rating: 3.7,
    },
    {
      id: 6,
      name: 'Paint',
      category: 'paint',
      code: 'TBX-0022',
      description: 'none',
      rating: 3.7,
    },
    {
      id: 7,
      name: 'Wrench',
      category: 'tools',
      code: 'TBC-0009',
      description: 'number 12 - 13',
      rating: 4.2,
    },
    {
      id: 9,
      name: 'Large spanner',
      category: 'tools',
      code: 'TBC-00200',
      description: 'Large spanner',
      rating: 3.9,
    },
    {
      id: 10,
      name: 'Battery loader',
      category: 'tools',
      code: 'TBC-0350',
      description: '15 Amp/h',
      rating: 3.9,
    },
  ];

  private categories = [
    {
      id: 1,
      name: 'tools',
    },
    {
      id: 2,
      name: 'paint',
    },
    {
      id: 3,
      name: 'wood',
    },
  ];

  getProducts() {
    return this.products;
  }

  getCategories() {
    return this.categories;
  }

  addProduct(product) {
    product.id = this.products.length + 1;
    this.products.push(product);
    return product;
  }

  updateProduct(product): any {
    let p = this.products.find((p) => p.id === product.id);
    if (p) {
      p = JSON.parse(JSON.stringify(product));
      return p;
    }
    return null;
  }

  deleteProduct(product): number {
    let idx = this.products.findIndex((p) => p.id === product.id);
    if (idx >= 0) {
      this.products.splice(idx, 1);
      return idx;
    }
    return -1;
  }
}

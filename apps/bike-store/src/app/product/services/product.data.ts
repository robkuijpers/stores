import { Product } from '../models';
export class ProductData {
  get() {
    const products: Product[] = [
      {
        id: 1,
        name: 'Leaf Rake',
        category: 'Home',
        code: 'GDN-0011',
        description: 'Leaf rake with 48-inch wooden handle',
        rating: 1.0,
      },
      {
        id: 1,
        name: 'Leaf Rake',
        category: 'Home',
        code: 'GDN-0011',
        description: 'Leaf rake with 48-inch wooden handle',
        rating: 3.2,
      },
      {
        id: 2,
        name: 'Garden Cart',
        code: 'GDN-0023',
        category: 'Home',
        description: '15 gallon capacity rolling garden cart',
        rating: 4.2,
      },
      {
        id: 5,
        name: 'Hammer',
        code: 'TBX-0048',
        category: 'Home',
        description: 'Curved claw steel hammer',
        rating: 4.8,
      },
      {
        id: 8,
        name: 'Saw',
        code: 'TBX-0022',
        category: 'Home',
        description: '15-inch steel blade hand saw',
        rating: 3.7,
      },
      {
        id: 10,
        name: 'Video Game Controller',
        code: 'GMG-0042',
        category: 'Home',
        description: 'Standard two-button video game controller',
        rating: 4.6,
      },
    ];
    return { products };
  }
}

import { Controller, Get, Post, Put, Delete, Param, Header, Body, Query } from '@nestjs/common';
import { Product } from './models';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Header('Cache-Control', 'none')
  getAll(@Query() query: any): Product[] {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Product {
    return this.productsService.findOne(id);
  }

  @Post()
  addProduct(@Body() product: Product): Product {
    return this.productsService.add(product);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() product: Product): any {
    return this.productsService.update(id, product);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): number {
    return this.productsService.delete(id);
  }
}

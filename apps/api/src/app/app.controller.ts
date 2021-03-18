import { Controller, Get, Post, Put, Delete } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('products')
  getProducts() {
    return this.appService.getProducts();
  }

  @Get('products')
  getCategories() {
    return this.appService.getCategories();
  }

  @Post('products')
  addProduct(product) {
    return this.appService.addProduct(product);
  }

  @Put('products')
  updateProduct(product) {
    return this.appService.updateProduct(product);
  }

  @Delete('products')
  deleteProduct(id: string) {
    return this.appService.deleteProduct(id);
  }
}

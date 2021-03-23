import { Module } from '@nestjs/common';

import { CoreModule } from '@stores/core';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [CoreModule],
  controllers: [ProductsController, CategoriesController],
  providers: [ProductsService, CategoriesService],
})
export class AppModule {}

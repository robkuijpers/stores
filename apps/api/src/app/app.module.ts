import { Module } from '@nestjs/common';

import { CoreModule } from '@stores/core';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [CoreModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class AppModule {}

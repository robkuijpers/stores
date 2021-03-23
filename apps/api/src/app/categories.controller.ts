import { Controller, Get, Header, Query } from '@nestjs/common';
import { Category } from './models';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @Header('Cache-Control', 'none')
  getAll(@Query() query: any): Category[] {
    return this.categoriesService.findAll(query);
  }
}

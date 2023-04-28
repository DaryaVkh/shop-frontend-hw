import { Controller, Get } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductsService } from './products.service';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('products')
  public async getProducts(): Promise<Product[]> {
    return this.productsService.findAll();
  }
}

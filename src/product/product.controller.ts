import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/create')
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);
    return {
      message: 'Product created successfully',
      product,
    };
  }

  @Get('/')
  async findAll() {
    const products = await this.productService.findAll();
    return {
      message: 'Products retrieved successfully',
      products,
    };
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(id);
    return {
      message: 'Product retrieved successfully',
      product,
    };
  }

  @Patch('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productService.update(id, updateProductDto);
    return {
      message: 'Product updated successfully',
      product,
    };
  }

  @Delete('/delete/:id')
  async remove(@Param('id') id: string) {
    const deletedProduct = await this.productService.remove(id);
    return {
      message: 'Product deleted successfully',
      product: deletedProduct,
    };
  }
}

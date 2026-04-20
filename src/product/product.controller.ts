import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException, // <-- Importante
  BadRequestException, // <-- Importante
  InternalServerErrorException, // <-- Importante
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/create')
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      const product = await this.productService.create(createProductDto);
      return {
        message: 'Product created successfully',
        product,
      };
    } catch (error) {
      const err = error as  { code?: number };
      if (err.code === 11000) {
        throw new BadRequestException('El producto ya existe en la base de datos.');
      }
      throw new InternalServerErrorException('Error inesperado al crear el producto.');
    }
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    try {
      const product = await this.productService.findOne(id);
      
      // Si el servicio no encuentra nada, lanzamos un 404
      if (!product) {
        throw new NotFoundException(`El producto con el ID #${id} no fue encontrado.`);
      }
      
      return {
        message: 'Product retrieved successfully',
        product,
      };
    } catch (error) {
      const err = error as { status?: number };
      // Si el error ya es una excepción de Nest (como el 404 de arriba), lo dejamos pasar
      if (err.status) {
        throw err;
      }
      // Si es un error de formato de ID de Mongoose (CastError), lanzamos un 400
      throw new BadRequestException(`El formato del ID proporcionado no es válido.`);
    }
  }
  
  @Get('/')
  async findAll() {
    try {
      const products = await this.productService.findAll();
      return {
        message: 'Products retrieved successfully',
        products,
      };
    } catch (error) {
      const err = error as { status?: number };
      if (err.status) {
        throw err;
      }
      throw new InternalServerErrorException('Error inesperado al recuperar los productos.');
    }
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const product = await this.productService.update(id, updateProductDto);
      return {
        message: 'Product updated successfully',
        product,
      };
    } catch (error) {
      const err = error as { status?: number };
      if (err.status) {
        throw err;
      }
      throw new InternalServerErrorException('Error inesperado al actualizar el producto.');
    }
  }

  @Delete('/delete/:id')
  async remove(@Param('id') id: string) {
    try {
      const deletedProduct = await this.productService.remove(id);
      return {
        message: 'Product deleted successfully',
        product: deletedProduct,
      };
    } catch (error) {
      const err = error as { status?: number };
      if (err.status) {
        throw err;
      }
      throw new InternalServerErrorException('Error inesperado al eliminar el producto.');
    }
  }
}

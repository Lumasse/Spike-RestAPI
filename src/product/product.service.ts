import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return await createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }

  async findOne(id: string): Promise<Product | null> {
    const product = await this.productModel.findById(id);
    return product;
  }

  async update(
    id: string,
    createProductDto: UpdateProductDto,
  ): Promise<Product | null> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      createProductDto,
      { returnDocument: 'after' },
    );
    return updatedProduct;
  }

  async remove(id: string): Promise<Product | null> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id);
    return deletedProduct;
  }
}

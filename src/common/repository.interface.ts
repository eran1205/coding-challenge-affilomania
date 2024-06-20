import { Product } from "../products/product.interface";

export interface IRepository<T> {
    findAll(): Promise<T[]>;
    findByIdAsync(id: string): Promise<T>;
    createNew(newProduct: Product): Promise<T>;
    delete(productId: string): Promise<unknown>;
  }
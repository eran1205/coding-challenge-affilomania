import { Product } from "../products/product.interface";

export interface IRepository<T> {
    findAll(): Promise<T[]>;
    createNew(newProduct: Product): Promise<T>;
  }
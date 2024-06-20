import DataSingelton from "../DataSingelton";
import { IRepository } from "../common/repository.interface";
import { Product } from "./product.interface";

export class ProductRepository implements IRepository<Product> {
    
    public async findAll(): Promise<Product[]> {
        return DataSingelton.getInstance().products;
    }
    
    public async createNew(newProduct: Product): Promise<Product> {
        DataSingelton.getInstance().products.push(newProduct);
        return newProduct;
    }

    public async findByIdAsync(id: string): Promise<Product> {
        return DataSingelton.getInstance().products.find((product) => product.id === id) as Product;
    }

    public async delete(productId: string): Promise<unknown> {
        return DataSingelton.getInstance().products.splice(DataSingelton.getInstance().products.findIndex(product => product.id === productId), 1);
    }
};
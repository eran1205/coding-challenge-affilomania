import ServerGlobal from "../ServerGlobal";
import { IRepository } from "../common/repository.interface";
import { Product } from "./product.interface";

export class ProductRepository implements IRepository<Product> {
    
    public async findAll(): Promise<Product[]> {
        return ServerGlobal.getInstance().products;
    }
    
    public async createNew(newProduct: Product): Promise<Product> {
        ServerGlobal.getInstance().products.push(newProduct);
        return newProduct;
    }

    public async findByIdAsync(id: string): Promise<Product> {
        return ServerGlobal.getInstance().products.find((product) => product.id === id) as Product;
    }

    public async delete(productId: string): Promise<unknown> {
        return ServerGlobal.getInstance().products.splice(ServerGlobal.getInstance().products.findIndex(product => product.id === productId), 1);
    }
};
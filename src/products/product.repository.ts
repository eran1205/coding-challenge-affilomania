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

};
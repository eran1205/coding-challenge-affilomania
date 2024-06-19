import ServerGlobal from "../ServerGlobal";
import { IRepository } from "../common/repository.interface";
import { Product } from "./product.interface";

export class ProductRepository implements IRepository<Product> {
    public async findAll(): Promise<Product[]> {
        return ServerGlobal.getInstance().products;
        // throw new Error("Method not implemented.");
    }
    
    // findByIdAsync: async (id: number): Promise<User | null> => {
    //   return users.find((user) => user.id === id) || null;
    // },
};
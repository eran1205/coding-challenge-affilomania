import { Request, Response } from 'express';
import { Product, SortOrder } from './product.interface';
import { IRepository } from '../common/repository.interface';
import { v4 as uuidv4 } from 'uuid';
import { ProductsUtils } from './product.utils';

export class ProductsController {
    private readonly _repository: IRepository<Product>;

    constructor(repository: IRepository<Product>) {
        this._repository = repository;
    }

    public async getAllProducts(request: Request, response: Response): Promise<unknown> {
        const page: number = parseInt(request.query.page as string); 
        const limit: number = parseInt(request.query.limit as string); 
        let sortBy  = request.query.sortBy as keyof Product;
        const sortOrder = request.query.orderBy as 'asc' | 'desc' | undefined;
        const queryName = request.query.searchByName as string;
        const queryDesc = request.query.searchByDesc as string;
        let allProducts: Product[] = await this._repository.findAll();

        if(sortBy == undefined || sortBy.toString() == "") {
            sortBy = "created_at";
        }

        if (sortBy) {
            allProducts.sort((a, b) => {
              if (a[sortBy] < b[sortBy]) return sortOrder === SortOrder.ASC ? -1 : 1;
              if (a[sortBy] > b[sortBy]) return sortOrder === SortOrder.ASC ? 1 : -1;
              return 0;
            });
        }
        if(limit && page) {
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            allProducts = allProducts.slice(startIndex, endIndex);    
        }
        
        if(queryName) {
            allProducts = allProducts.filter(product => product.name.includes(queryName));
        }

        if(queryDesc) {
            allProducts = allProducts.filter(product => product.description.includes(queryDesc));
        }
        return response.status(200).send(allProducts);
    }

    public async getMostPopularBySoldItems(request: Request, response: Response): Promise<unknown> {
        const allProducts: Product[] = await this._repository.findAll();
        const sortedBySoldItems = allProducts.sort((product1: Product, product2: Product) => product2.sold - product1.sold);

        return response.status(200).send(sortedBySoldItems);
    }

    public async getItemsOrderByStock(request: Request, response: Response): Promise<unknown> {
        const allProducts: Product[] = await this._repository.findAll();
        const sortOrder = request.query.orderBy as 'asc' | 'desc' | undefined;
        const productsByStock = allProducts
            .map(product => ({...product, stock: product.quantity - product.sold }))
            .sort((product1, product2) =>  {
                if (product1.stock < product2.stock) return sortOrder === SortOrder.ASC ? -1 : 1;
                if (product1.stock > product2.stock) return sortOrder === SortOrder.ASC ? 1 : -1;
                return 0;
              });

        return response.status(200).send(productsByStock);
    }

    public async createNewProduct(request: Request, response: Response): Promise<unknown> {
        const newProduct: Product = request.body;
        const now = new Date().toISOString();
        
        newProduct.id = uuidv4();
        newProduct.created_at = now;
        newProduct.updated_at = now;
        
        if(ProductsUtils.checkifNameUnique(newProduct.name)) {
            return this._repository
            .createNew(newProduct)
            .then((product) => response.status(200).send(product))
            .catch((error) => response.status(500).send({ error: error }));
        } else {
            return new Promise(() => { throw "Product name already exists";})
              .catch((error) => response.status(500).send({ error: error }));
        }
    }

    public async updateProduct(request: Request, response: Response): Promise<unknown> {
        const productId = request.params.id as string;
        const updatedData: Product = request.body;

        const foundProduct = await this._repository.findByIdAsync(productId);
        if(foundProduct == undefined) 
            return response.status(404).send(`Product was id ${productId} doesn't exist`);
        
        if(updatedData.name != "" && updatedData.name != undefined) {
            if(!ProductsUtils.checkifNameUnique(updatedData.name)) {
                return new Promise(() => { throw "Product name already exists";})
                    .catch((error) => response.status(500).send({ error: error }));
            }
            foundProduct.name = updatedData.name;
        }
        if(updatedData.description != "" && updatedData.description != undefined) {
            foundProduct.description = updatedData.description;
        }
        if(updatedData.price != undefined) {
            foundProduct.price = updatedData.price;
        }
        if(updatedData.quantity != undefined) {
            foundProduct.quantity = updatedData.quantity;
        }
        if(updatedData.sold != undefined) {
            foundProduct.sold = updatedData.sold;
        }
        if(updatedData.pending_orders != undefined) {
            foundProduct.pending_orders = updatedData.pending_orders;
        }

        foundProduct.updated_at = new Date().toISOString();
        return response.status(200).send(updatedData);
    }

    public async deleteProduct(request: Request, response: Response): Promise<unknown> {
        const productId = request.params.id as string;

        const foundProduct = await this._repository.findByIdAsync(productId);
        if(foundProduct == undefined) 
            return response.status(404).send(`Product was id ${productId} doesn't exist`);

        if(foundProduct.pending_orders > 0) {
            return response.status(403).send(`Product id ${productId} has pending orders and can be deleted`);
        }

        return this._repository.delete(productId)
            .then(() => response.status(200).send(`Product with id ${productId} was delete successfully`))
            .catch((error) => response.status(500).send({ error: error }));
        // return response.status(200).send("Product was deleted successfully");
    }
}
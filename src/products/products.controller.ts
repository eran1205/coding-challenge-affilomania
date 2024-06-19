import { Request, Response } from 'express';
import { Product } from './product.interface';
import { IRepository } from '../common/repository.interface';
import { v4 as uuidv4 } from 'uuid';
import ServerGlobal from '../ServerGlobal';

export class ProductsController {
    private readonly _repository: IRepository<Product>;

    constructor(repository: IRepository<Product>) {
        this._repository = repository;
    }

    public async getAllProducts(request: Request, response: Response): Promise<unknown> {
        return this._repository
            .findAll()
            .then((users) => response.status(200).send(users))
            .catch((error) => response.status(500).send({ error: error }));
    }

    public async createNewProduct(request: Request, response: Response): Promise<unknown> {
        console.log("req.body: " ,request.body);
        const newProduct: Product = request.body;
        const now = new Date().toISOString();
        
        newProduct.id = uuidv4();
        newProduct.created_at = now;
        newProduct.updated_at = now;
        
        const filteredProducts = ServerGlobal.getInstance().products.filter(product => product.name === newProduct.name);
        console.log(filteredProducts);
        if(filteredProducts.length == 0) {
            return this._repository
            .createNew(newProduct)
            .then((product) => response.status(200).send(product))
            .catch((error) => response.status(500).send({ error: error }));
        } else {
            console.log('Duplicated names');
            return new Promise(() => { throw "The name already exists";})
              .catch((error) => response.status(500).send({ error: error }));
        }

        
    }
}
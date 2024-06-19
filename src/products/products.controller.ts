import { Request, Response } from 'express';
import { Product } from "./product.interface";
import { IRepository } from "../common/repository.interface";

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
}

// export default ProductsController;

// export const getProducts = async (req: Request, res: Response) => {
//     const products = async productRepository.findAllAsync
//     res.json({ success: true });
// };

// export const testRoute = async (req: Request, res: Response) => {
//     res.json({ success: true });
// };
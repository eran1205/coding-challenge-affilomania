import express, { Request, Response } from 'express';
import { Product } from '../products/product.interface';
import { ProductRepository } from '../products/product.repository';
import { ProductsController } from '../products/products.controller';
import { IRepository } from '../common/repository.interface';

export const router = express.Router();
const productsRepository: IRepository<Product> = new ProductRepository();
const controller: ProductsController = new ProductsController(productsRepository);

router.get('/', async (request: Request, response: Response) => {
    await controller.getAllProducts(request, response);
});

router.get('/mostPopularItems', async (request: Request, response: Response) => {
    await controller.getMostPopularBySoldItems(request, response);
});

router.get('/orderByStock', async (request: Request, response: Response) => {
    await controller.getItemsOrderByStock(request, response);
});

router.post('/', async (req: Request, res: Response) => {
    await controller.createNewProduct(req, res);
});

router.put('/:id', async (req: Request, res: Response) => {
    await controller.updateProduct(req, res);
});

router.delete('/:id', async (req: Request, res: Response) => {
    await controller.deleteProduct(req, res);
});
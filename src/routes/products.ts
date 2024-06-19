import express, { Request, Response } from 'express';
import ServerGlobal from '../ServerGlobal';
import { Product } from '../products/product.interface';
import { ProductRepository } from '../products/product.repository';
import { ProductsController } from '../products/products.controller';
import { IRepository } from '../common/repository.interface';

export const router = express.Router();
const productsRepository: IRepository<Product> = new ProductRepository();
const controller: ProductsController = new ProductsController(productsRepository);

// router.get('/', (req: Request, res: Response) => {

//     res.json(ServerGlobal.getInstance() .products);
// });

//router.get('/', ProductController.getProducts);

router.get('/', async (request: Request, response: Response) => {
    await controller.getAllProducts(request, response);
  });

router.post('/', (req: Request, res: Response) => {
    // Fetched the user using body data
    console.log("req.body: " ,req.body);
    const product: Product = req.body;

    console.log(product);
    // Assign the user in fake_db with id as a index
    ServerGlobal.getInstance().products.push(product);

    res.json(product);
});
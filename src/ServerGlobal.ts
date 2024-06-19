import { Product } from "./products/product.interface";
import fs from 'fs';

class ServerGlobal {
    private static _instance: ServerGlobal;
    private _products: Product[];

    private constructor() {
        this._products = JSON.parse(fs.readFileSync('./src/database/products.database.json', 'utf-8'));
        console.log("Initialize products successfully");
    }

    static getInstance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new ServerGlobal();
        return this._instance;
    }
    public get products() {
        return this._products;
    }
}

export default ServerGlobal;
import ServerGlobal from "../ServerGlobal";

export class ProductsUtils {
    public static checkifNameUnique(updatedName: string): boolean {
        const filteredProducts = ServerGlobal.getInstance().products.filter(product => product.name === updatedName);
        return filteredProducts.length === 0;        
    }
}
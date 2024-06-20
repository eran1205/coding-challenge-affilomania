import ServerGlobal from "../DataSingelton";
import { Product, SortOrder } from './product.interface';

export class ProductsUtils {
    public static checkifNameUnique(updatedName: string): boolean {
        const filteredProducts = ServerGlobal.getInstance().products.filter(product => product.name === updatedName);
        return filteredProducts.length === 0;        
    }

    public static queryByParam(listOfProducts: Product[], param: string): Product[] {
        return listOfProducts.filter(product => product.name.includes(param));
    }

    public static sortByParameter(listOfProducts: Product[], sortParam: keyof Product, sortOrder: string | undefined ): Product[] {
        return listOfProducts.sort((a, b) => {
            if (a[sortParam] < b[sortParam]) return sortOrder === SortOrder.ASC ? -1 : 1;
            if (a[sortParam] > b[sortParam]) return sortOrder === SortOrder.ASC ? 1 : -1;
            return 0;
          });
    }
}
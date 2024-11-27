import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/products';
import { deleteProduct, getProductById, getProducts, persistDetailProduct, persistProducts, saveNewProduct } from '../redux/dashboard.actions';
import { DashboardState } from '../redux/dashboard.reducers';
import { selectProducts, selectProductsSortedByTitle, selectSelectedProduct } from '../redux/dashboard.selectors';

@Injectable({
    providedIn: 'root',
})
export class DashboardFacade {

    constructor(private readonly store: Store<DashboardState>) { }

    products$: Observable<Product[] | null> = this.store.pipe(select(selectProducts));
    productsOrderedByTitle$: Observable<Product[] | null> = this.store.pipe(select(selectProductsSortedByTitle));
    selectedProduct$: Observable<Product | null> = this.store.pipe(select(selectSelectedProduct));

    getProducts(page?: number, elements?: number): void {
        this.store.dispatch(getProducts({ page, elements }));
    }

    persistProducts(products: Product[]): void {
        this.store.dispatch(persistProducts({ products }));
    }

    saveNewProduct(product: Product): void {
        this.store.dispatch(saveNewProduct({  product }));
    }

    getProductById(idProduct: string): void {
        this.store.dispatch(getProductById({  idProduct }));
    }

    persistDetailProduct(product: Product): void {
        this.store.dispatch(persistDetailProduct({ product }));
    }

    deleteProduct(idProduct: string): void {
        this.store.dispatch(deleteProduct({ idProduct }));
    }
}

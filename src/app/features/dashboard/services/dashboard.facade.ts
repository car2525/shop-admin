import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Store as StoreModel } from 'src/app/core/api/models/store';
import { deleteProduct, getProductById, getProducts, getStoreById, persistDetailProduct, persistProducts, persistStore, saveNewProduct } from '../redux/dashboard.actions';
import { DashboardState } from '../redux/dashboard.reducers';
import { selectProducts, selectProductsSortedByTitle, selectSelectedProduct, selectStore, selectStoreEmployees, selectStoreName } from '../redux/dashboard.selectors';
import { Product } from 'src/app/core/models/products';

@Injectable({
    providedIn: 'root',
})
export class DashboardFacade {

    constructor(private readonly store: Store<DashboardState>) { }

    store$: Observable<StoreModel | null> = this.store.pipe(select(selectStore));
    storeName$: Observable<string> = this.store.pipe(select(selectStoreName));
    products$: Observable<Product[] | null> = this.store.pipe(select(selectProducts));
    productsOrderedByTitle$: Observable<Product[] | null> = this.store.pipe(select(selectProductsSortedByTitle));
    selectedProduct$: Observable<Product | null> = this.store.pipe(select(selectSelectedProduct));
    storeEmployees$: Observable<string[]> = this.store.pipe(select(selectStoreEmployees));

    getStoreById(): void {
        this.store.dispatch(getStoreById());
    }

    persistStore(store: StoreModel): void {
        this.store.dispatch(persistStore({ store }));
    }

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

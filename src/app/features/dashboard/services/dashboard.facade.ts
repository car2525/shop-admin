import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Store as StoreModel } from 'src/app/core/api/models/store';
import { deleteProduct, getProductById, getProducts, getStoreById, persistDetailProductAfterGet, persistProductsAfterGet, persistStoreAfterGet, saveNewProduct } from '../redux/dashboard.actions';
import { DashboardState } from '../redux/dashboard.reducers';
import { selectProducts, selectSelectedProduct, selectStore, selectStoreName } from '../redux/dashboard.selectors';
import { Product } from 'src/app/core/models/products';

@Injectable({
    providedIn: 'root',
})
export class DashboardFacade {

    constructor(private readonly store: Store<DashboardState>) { }

    store$: Observable<StoreModel | null> = this.store.pipe(select(selectStore));
    storeName$: Observable<string> = this.store.pipe(select(selectStoreName));
    products$: Observable<Product[] | null> = this.store.pipe(select(selectProducts));
    selectedProduct$: Observable<Product | null> = this.store.pipe(select(selectSelectedProduct));

    getStoreById(): void {
        this.store.dispatch(getStoreById());
    }

    persistStore(store: StoreModel): void {
        this.store.dispatch(persistStoreAfterGet({ store }));
    }

    getProducts(idStore: string, page?: number, elements?: number): void {
        this.store.dispatch(getProducts({ page, elements }));
    }

    persistProducts(products: Product[]): void {
        this.store.dispatch(persistProductsAfterGet({ products }));
    }

    saveNewProduct(product: Product): void {
        this.store.dispatch(saveNewProduct({  product }));
    }

    getProductById(idProduct: string): void {
        this.store.dispatch(getProductById({  idProduct }));
    }

    persistDetailProduct(product: Product): void {
        this.store.dispatch(persistDetailProductAfterGet({ product }));
    }

    deleteProduct(idProduct: string): void {
        this.store.dispatch(deleteProduct({ idProduct }));
    }
}

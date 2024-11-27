import { TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { provideMockStore } from "@ngrx/store/testing";
import { Product } from "src/app/core/models/products";
import { deleteProduct, getProducts, saveNewProduct } from "../redux/dashboard.actions";
import { DashboardFacade } from "./dashboard.facade";

describe('DashboardFacade', () => {
    let facade: DashboardFacade;
    let store: jasmine.SpyObj<Store>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DashboardFacade,
                provideMockStore(),
            ],
        });

        facade = TestBed.inject(DashboardFacade);
        store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
        spyOn(store, 'dispatch');
    });

    it('should dispatch getProducts action with correct payload', () => {
        facade.getProducts();
        expect(store.dispatch).toHaveBeenCalledWith(getProducts({ page: undefined, elements: undefined }));
    });

    it('should dispatch saveNewProduct action with correct product', () => {
        const product: Product = { id: '1', title: 'New Product', category: 'Category 1', price: 4 };
        facade.saveNewProduct(product);
        expect(store.dispatch).toHaveBeenCalledWith(saveNewProduct({ product }));
    });

    it('should dispatch deleteProduct action with correct id', () => {
        const productId = 'abc123';
        facade.deleteProduct(productId);
        expect(store.dispatch).toHaveBeenCalledWith(deleteProduct({ idProduct: productId }));
    });
});

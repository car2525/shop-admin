import { TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { provideMockStore } from "@ngrx/store/testing";
import { Store as StoreModel } from "src/app/core/api/models/models";
import { Product } from "src/app/core/models/products";
import { deleteProduct, getProducts, getStoreById, persistStore, saveNewProduct } from "../redux/dashboard.actions";
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

    it('should dispatch getStoreById action', () => {
        facade.getStoreById();

        expect(store.dispatch).toHaveBeenCalledWith(getStoreById());
    });

    it('should dispatch persistStore action', () => {
        const mockStore: StoreModel = { name: 'Test Store', category: 'Category', employees: ['Alice', 'Mario'] };

        facade.persistStore(mockStore);

        expect(store.dispatch).toHaveBeenCalledWith(persistStore({ store: mockStore }));
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

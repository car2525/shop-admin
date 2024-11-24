import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { StoreResponse, ProductResponse, ProductItem, StatsCategories, Store } from '../models/models';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch all stores', () => {
    const mockStores: StoreResponse[] = [
      { id: '1', data: { name: 'Store 1', category: 'Cstegory 1', employees: ['Mario', 'Franco'] } },
      { id: '2', data: { name: 'Store 2', category: 'ClotCategory 1', employees: ['Paolo', 'Marco'] } }
    ];
    
    service.getStores().subscribe((stores) => {
      expect(stores).toEqual(mockStores);
    });

    const req = httpMock.expectOne(`${service.getBasePath()}/stores`);
    expect(req.request.method).toBe('GET');
    req.flush(mockStores);
  });

  it('should fetch a specific store by ID', () => {
    const storeId = 'abc123';
    const mockStore: Store = { name: 'Store ABC', category: 'Category', employees: ['Paolo', 'Mario'] };

    service.getStoresIdStore(storeId).subscribe((store) => {
      expect(store).toEqual(mockStore);
    });

    const req = httpMock.expectOne(`${service.getBasePath()}/stores/${encodeURIComponent(storeId)}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockStore);
  });

  it('should delete a product', () => {
    const storeId = 'abc123';
    const productId = 'bde234';

    service.deleteProduct(storeId, productId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(
      `${service.getBasePath()}/stores/${encodeURIComponent(storeId)}/products/${encodeURIComponent(productId)}`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush('delete ok'); 
  });

  it('should fetch products with query parameters', () => {
    const storeId = 'abc123';
    const page = 2;
    const elements = 10;
    const mockProducts: ProductResponse[] = [
      { id: 'bbb222', data: { title: 'Product 1', category: 'Category', price: 2 } },
      { id: 'ccc222', data: { title: 'Product 2', category: 'Category', price: 4 } }
    ];

    service.getProductsIdStore(storeId, page, elements).subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(
      `${service.getBasePath()}/stores/${encodeURIComponent(storeId)}/products?page=${page}&elements=${elements}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should create a new product', () => {
    const storeId = 'abc123';
    const newProduct: ProductItem = {
      title: 'New Product',
      category: 'Category',
      price: 5,
      employee: 'Mario',
      description: 'Product',
      reviews: ['Ok']
    };

    service.postProducts(storeId, newProduct).subscribe((response) => {
      expect(response).toEqual('productId');
    });

    const req = httpMock.expectOne(
      `${service.getBasePath()}/stores/${encodeURIComponent(storeId)}/products`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newProduct);
    req.flush('productId');
  });

  it('should fetch stats categories for a store', () => {
    const storeId = 'abc123';
    const mockStats: StatsCategories[] = [
      { category: 'Category', numberOfProducts: 10 },
      { category: 'Category', numberOfProducts: 5 }
    ];

    service.getStatsCategories(storeId).subscribe((stats) => {
      expect(stats).toEqual(mockStats);
    });

    const req = httpMock.expectOne(`${service.getBasePath()}/stores/${encodeURIComponent(storeId)}/stats/categories`);
    expect(req.request.method).toBe('GET');
    req.flush(mockStats);
  });
});

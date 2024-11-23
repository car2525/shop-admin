import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductItem, ProductResponse, StatsCategories, Store, StoreResponse } from '../models/models';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  protected basePath = 'http://us-central1-test-b7665.cloudfunctions.net/api';

  constructor(private readonly httpClient: HttpClient) {
  }

  /**
   * Returns all the stores
   */
  public getStores(): Observable<Array<StoreResponse>> {
    return this.httpClient.get<Array<StoreResponse>>(`${this.basePath}/stores`);
  }

  /**
   * return a specific store
   * @param idStore your store ID
   */
  public getStoresIdStore(idStore: string): Observable<Store> {
    return this.httpClient.get<Store>(`${this.basePath}/stores/${encodeURIComponent(String(idStore))}`);
  }

  /**
   * return multiple products, if you want you can add a pagination query with page and elements per page
   * @param idStore your store ID
   * @param page select the products that are in that page based on elements query parameter, start from 1
   * @param elements number of products you want per page
   */
  public getProductsIdStore(idStore: string, page?: number, elements?: number): Observable<Array<ProductResponse>> {

    let queryParameters = new HttpParams();
    if (page !== undefined && page !== null) {
      queryParameters = queryParameters.set('page', <any>page);
    }
    if (elements !== undefined && elements !== null) {
      queryParameters = queryParameters.set('elements', <any>elements);
    }

    return this.httpClient.get<Array<ProductResponse>>(`${this.basePath}/stores/${encodeURIComponent(String(idStore))}/products`,
      {
        params: queryParameters
      }
    );
  }

  /**
   * delete a specific product
   * @param idStore your store ID
   * @param idProduct your product ID
   */
  public deleteProduct(idStore: string, idProduct: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.basePath}/stores/${encodeURIComponent(String(idStore))}/products/${encodeURIComponent(String(idProduct))}`);
  }

  /**
   * return a specific product
   * @param idStore your store ID
   * @param idProduct your product ID
   */
  public getProduct(idStore: string, idProduct: string): Observable<ProductItem> {
    return this.httpClient.get<ProductItem>(`${this.basePath}/stores/${encodeURIComponent(String(idStore))}/products/${encodeURIComponent(String(idProduct))}`);
  }

  /**
   * create a new product
   * @param idStore your store ID
   * @param newProduct the data you need for the new product you want to add
   */
  public postProducts(idStore: string, newProduct: ProductItem): Observable<any> {
    const headers = new HttpHeaders();
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text'
    };
    return this.httpClient.post<any>(`${this.basePath}/stores/${encodeURIComponent(String(idStore))}/products`,
      newProduct, requestOptions);
  }

  /**
   * return the data for the products per category chart
   * @param idStore your store ID
   */
  public getStatsCategories(idStore: string): Observable<Array<StatsCategories>> {
    return this.httpClient.get<Array<StatsCategories>>(`${this.basePath}/stores/${encodeURIComponent(String(idStore))}/stats/categories`);
  }

}

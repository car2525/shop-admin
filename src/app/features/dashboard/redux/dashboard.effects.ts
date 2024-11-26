import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { ApiService } from 'src/app/core/api/api/api.service';
import { ProductItem } from 'src/app/core/api/models/productItem';
import { ProductResponse } from 'src/app/core/api/models/productResponse';
import { Store as StoreModel } from 'src/app/core/api/models/store';
import { Product } from 'src/app/core/models/products';
import { handleError, operationSuccess } from 'src/app/core/redux/global.actions';
import { selectIdStore } from 'src/app/core/redux/global.selectors';
import {
  deleteProduct,
  getProductById,
  getProducts,
  getStoreById,
  persistDetailProduct,
  persistProducts,
  persistStore,
  saveNewProduct
} from './dashboard.actions';

@Injectable()
export class DashboardEffects {
  constructor(private readonly actions$: Actions, private readonly store: Store, private readonly apiService: ApiService) { }

  // Effetto per ottenere un negozio tramite ID
  getStoreById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getStoreById),
      withLatestFrom(this.store.select(selectIdStore)),
      take(1),
      switchMap(([_, idStore]) =>
        this.apiService.getStoresIdStore(idStore).pipe(
          map((store: StoreModel) => persistStore({ store })),
          catchError((_) =>
            of(handleError(
              {
                errorMsg: 'Errore nel recupero delle informazioni sul negozio'
              }
            )
            ))
        )
      )
    )
  );

  // Effetto per ottenere i prodotti di un negozio
  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProducts),
      withLatestFrom(this.store.select(selectIdStore)),
      switchMap(([action, idStore]) =>
        this.apiService.getProductsIdStore(idStore, action.page, action.elements).pipe(
          map((response: ProductResponse[]) => {
            const products: Product[] = response
              .filter((item) => item.data)
              .map((item) => {
                return {
                  id: item.id,
                  ...this.normalizeProductData(item.data)
                } as Product
              });
            return persistProducts({ products });
          }),
          catchError((_) =>
            of(handleError(
              {
                errorMsg: 'Errore nel recupero dei prodotti'
              }
            )
            ))
        )
      )
    )
  );

  // Effetto per salvare un nuovo prodotto
  saveNewProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveNewProduct),
      withLatestFrom(this.store.select(selectIdStore)),
      switchMap(([action, idStore]) => {
        return this.apiService.postProducts(idStore, action.product).pipe(
          mergeMap(() => [
            operationSuccess({ message: 'Prodotto salvato con successo!' }),
            persistProducts({ products: [] }),
            getProducts({}),
          ]),
          catchError((_) => {
            return of(handleError(
              {
                errorMsg: 'Errore durante il salvataggio'
              }
            )
            )})
        )
      }
        
      )
    )
  );

  // Effetto per ottenere un prodotto per ID
  getProductById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProductById),
      withLatestFrom(this.store.select(selectIdStore)),
      switchMap(([action, idStore]) =>
        this.apiService.getProduct(idStore, action.idProduct).pipe(
          map((product: Product) => persistDetailProduct({ product })),
          catchError((_) =>
            of(handleError(
              {
                errorMsg: 'Errore nel recupero del prodotto'
              }
            )
            ))
        )
      )
    )
  );

  // Effetto per eliminare un prodotto
  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),
      withLatestFrom(this.store.select(selectIdStore)),
      switchMap(([action, idStore]) =>
        this.apiService.deleteProduct(idStore, action.idProduct).pipe(
          mergeMap(() => [
            operationSuccess({ message: 'Prodotto eliminato con successo!' }),
            persistProducts({ products: [] }),
            getProducts({}),
          ]),
          catchError((_) =>
            of(handleError(
              {
                errorMsg: 'Errore durante l\'operazione'
              }
            )
            ))
        )
      )
    )
  );

  private normalizeProductData(productItem?: ProductItem): ProductItem | undefined {
    if (!productItem) return productItem;
    return {
      ...productItem,
      reviews: productItem?.reviews?.filter((r: string) => r && r.trim() !== '' )
    }
  }
}

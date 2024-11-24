import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { GlobalFacade } from '../services/global.facade';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private readonly globalFacade: GlobalFacade){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.globalFacade.startLoading();
    return next.handle(req).pipe(
      finalize(() => this.globalFacade.stopLoading())
    );
  }
}

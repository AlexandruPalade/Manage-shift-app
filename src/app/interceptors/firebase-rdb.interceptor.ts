import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FirebaseRDBInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.includes('shift-app-7c7c7-default-rtdb')) {
      const changedRequest = request.clone({
        url: request.url + '.json',
      });
      return next.handle(changedRequest);
    }
    return next.handle(request);
  }
}

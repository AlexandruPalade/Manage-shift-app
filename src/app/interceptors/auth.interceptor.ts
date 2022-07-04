import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../core/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const currentSession = this.authService.session.getValue();
    console.log(currentSession);
    const currentToken = currentSession?.token;

    if (currentToken) {
      const requestWithAuth = request.clone({
        params: request.params.append('auth', currentToken),
      });

      return next.handle(requestWithAuth);
    }

    return next.handle(request);
  }
}

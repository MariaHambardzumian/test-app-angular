import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  private authSessionToken = this.authService.getSessionToken()
  private authSignupToken = environment.authUserToken;
  private apiKey = environment.apiKey;
  private loginEndpoint = environment.loginEndpoint;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {    
    if (
      request.method === 'POST' &&
      (request.url.endsWith(this.loginEndpoint) ||
        request.url.endsWith(this.apiKey))
    ) {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${this.authSignupToken}`,
        },
      });
    }
  if(this.authSessionToken){
      request = request.clone({
        setHeaders: {
          Authorization: `Kinvey ${this.authSessionToken}`,
        },
      });
    }

    return next.handle(request);
  }
}

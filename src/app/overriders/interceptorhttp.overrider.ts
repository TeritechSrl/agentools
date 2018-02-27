import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { environment } from "../../environments/environment";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { AuthService } from "../security/service/auth.service";
@Injectable()
export class HttpLogInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {

  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      url: environment.origin + request.url,
      setHeaders: {
        Authorization: 'Bearer ' + this.authService.getToken()
      }
    });
    return next.handle(request).catch((error: any) => {
      const err = error.json();

      // Refresh JWT
      if (err.status === 401 || err.status === 403) {
        // Add your token refresh logic here.
        console.log('Token expired')
        this.authService.login();
      }

      return Observable.throw(err);
    });
  }
}
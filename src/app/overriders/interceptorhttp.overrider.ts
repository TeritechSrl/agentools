import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import { environment } from "../../environments/environment";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
@Injectable()
export class  HttpLogInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
      request = request.clone({url:environment.origin+request.url});
    return next.handle(request);
  }
}
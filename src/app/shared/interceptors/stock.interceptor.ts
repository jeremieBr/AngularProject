import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class StockInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const httpRequest = new HttpRequest(
      <any>request.method,
      `${request.url}&token=${environment.finnhubApiKey}`
    );
    request = Object.assign(request, httpRequest);
    // return next.handle(
    //   request.clone({
    //     setHeaders: {
    //       "x-finnhub-token": api_key,
    //     },
    //   })
    // );
    return next.handle(request.clone(request));
  }
}

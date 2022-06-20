import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class StockInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const httpRequest = new HttpRequest(
      <any>request.method,
      `${request.url}&token=${environment.finnhubApiKey}`
    );
    request = Object.assign(request, httpRequest);
    return next.handle(request.clone(request)).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error("An error occurred:", error.message);
        return throwError(() => error);
      })
    );
  }
}

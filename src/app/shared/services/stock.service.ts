import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { StockMarket } from "../models/stockMarket.model";

@Injectable({
  providedIn: "root",
})
export class StockService {
  constructor(private httpClient: HttpClient) {}

  getBySymbol(symbol: string): Observable<StockMarket> {
    return this.httpClient.get<StockMarket>(
      `${environment.finnhubApiUrl}/quote?symbol=${symbol}`
    );
  }
}

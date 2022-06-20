import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { searchDetailsStock, StockMarket } from "../models/stockMarket.model";
import { StockStoreService } from "./stock-store.service";

@Injectable({
  providedIn: "root",
})
export class StockService {
  constructor(
    private httpClient: HttpClient,
    private stockStoreService: StockStoreService
  ) {}

  /**
   *
   * @param symbol Symbol of stock
   * @returns Observable of Stock
   */
  public getBySymbol(symbol: string): Observable<StockMarket> {
    return this.httpClient.get<StockMarket>(
      `${environment.finnhubApiUrl}/quote?symbol=${symbol}`
    );
  }

  public getDescBySymbol(symbol: string): Observable<searchDetailsStock> {
    return this.httpClient.get<any>(
      `${environment.finnhubApiUrl}/search?q=${symbol}`
    );
  }

  /**
   * Add stock to localStorage
   * @param stock Stock
   */
  public addStockToLocalStorage(stock: StockMarket): void {
    this.stockStoreService.addStock(stock);
  }

  /**
   * Remove stock from localStorage
   * @param stock Stock
   */
  public removeStockFromLocalStorage(stock: StockMarket): void {
    this.stockStoreService.removeStock(stock);
  }

  /**
   * Get string from localStorage and return a list of stocks.
   * @returns List of stocks
   */
  public getStocks(): StockMarket[] {
    const localStoragestocks = localStorage.getItem("stocks");
    return localStoragestocks?.length ? JSON.parse(localStoragestocks) : [];
  }
}

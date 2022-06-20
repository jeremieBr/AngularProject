import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ResultSentiment, Sentiment } from "../models/sentiment.model";
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

  /**
   *
   * @param symbol Symbol of stock
   * @returns Observable of SearchDetailsStock
   */
  public getDescBySymbol(symbol: string): Observable<searchDetailsStock> {
    return this.httpClient.get<searchDetailsStock>(
      `${environment.finnhubApiUrl}/search?q=${symbol}`
    );
  }

  /**
   *
   * @param monthsDuration Number of month sentiments
   * @param symbol Symbol of stock
   * @returns Observable of an Array of Sentiment
   */
  public getDetailsByMonths(
    monthsDuration: number,
    symbol: string
  ): Observable<Sentiment[]> {
    const endDate = new Date();
    endDate.setDate(1);
    const startDate = new Date(endDate);
    startDate.setMonth(endDate.getMonth() - (monthsDuration - 1));
    return this.httpClient
      .get<ResultSentiment>(
        `${
          environment.finnhubApiUrl
        }/stock/insider-sentiment?symbol=${symbol}&from=${
          startDate.toISOString().split("T")[0]
        }&to=${endDate.toISOString().split("T")[0]}`
      )
      .pipe(map((res: ResultSentiment) => res.data));
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
   * @returns Array of stocks or empty array
   */
  public getStocks(): StockMarket[] {
    const localStoragestocks = localStorage.getItem(
      environment.stockLocalStorageKey
    );
    return localStoragestocks?.length ? JSON.parse(localStoragestocks) : [];
  }
}

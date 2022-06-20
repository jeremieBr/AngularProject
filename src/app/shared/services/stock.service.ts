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
   * Add stock to localStorage
   * @param stock Stock
   */
  public addStockToLocalStorage(stock: StockMarket): void {
    const stockIndex = this.verifyExistingStock(stock);
    let stocks = this.getStocks();
    if (stockIndex !== -1) {
      stocks[stockIndex] = stock;
    } else {
      stocks.push(stock);
    }
    localStorage.setItem("stocks", JSON.stringify(stocks));
  }

  /**
   * Verify if stock exist by return an index.
   * @param stock Stock market to be add
   * @returns index of stock
   */
  public verifyExistingStock(stock: StockMarket): number {
    const stocks = this.getStocks();
    const stockIndex = stocks.findIndex((s: StockMarket) => {
      return s.symbol === stock.symbol;
    });

    return stockIndex;
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

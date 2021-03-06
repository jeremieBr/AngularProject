import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { StockMarket } from "../models/stockMarket.model";

@Injectable({
  providedIn: "root",
})
export class StockStoreService {
  private readonly stocks$ = new BehaviorSubject<StockMarket[]>([]);

  constructor() {}

  /**
   * Update subject with new data
   * @param stocks Array of stock
   */
  public setStocks(stocks: StockMarket[]): void {
    this.stocks$.next(stocks);
  }

  /**
   * Add stock to localStorage, then update subject
   * @param stock : Stock market to add
   */
  public addStock(stock: StockMarket): void {
    const stockIndex = this.verifyExistingStock(stock);
    const stocks = this.stocks$.value;
    if (stockIndex !== -1) {
      stocks[stockIndex] = stock;
    } else {
      stocks.push(stock);
    }

    localStorage.setItem(
      environment.stockLocalStorageKey,
      JSON.stringify(stocks)
    );
    this.setStocks(stocks);
  }

  /**
   * Remove stock from localStorage, then update subject
   * @param stock Stock market to delete
   */
  public removeStock(stock: StockMarket): void {
    const stockIndex = this.verifyExistingStock(stock);
    const stocks = this.stocks$.value;
    if (stockIndex !== -1) {
      stocks.splice(stockIndex, 1);
      localStorage.setItem(
        environment.stockLocalStorageKey,
        JSON.stringify(stocks)
      );
      this.setStocks(stocks);
    }
  }

  /**
   * Verify if stock exist by returning an index.
   * @param stock Stock market to check
   * @returns index of stock
   */
  public verifyExistingStock(stock: StockMarket): number {
    const stocks = this.stocks$.value;
    const stockIndex = stocks.findIndex((s: StockMarket) => {
      return s.symbol === stock.symbol;
    });

    return stockIndex;
  }

  /**
   * Return current stocks as Observable.
   */
  get getStocks$(): Observable<StockMarket[]> {
    return this.stocks$.asObservable();
  }
}

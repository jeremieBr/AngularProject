import { Component, OnInit } from "@angular/core";
import { Observable, Subject, takeUntil } from "rxjs";
import { StockMarket } from "../shared/models/stockMarket.model";
import { StockStoreService } from "../shared/services/stock-store.service";
import { StockService } from "../shared/services/stock.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  stocks!: Observable<StockMarket[]>;

  // Private
  private notifier = new Subject();

  constructor(
    private stockService: StockService,
    private stockStoreService: StockStoreService
  ) {}

  ngOnInit(): void {
    // Init data logic
    this.stocks = this.stockStoreService.getStocks$.pipe(
      takeUntil(this.notifier)
    );

    // Update data with localStorage values
    this.stockStoreService.setStocks(this.stockService.getStocks());
  }

  public removeStock(stock: StockMarket): void {
    this.stockService.removeStockFromLocalStorage(stock);
  }

  ngOnDestroy() {
    this.notifier.next("");
    this.notifier.complete();
  }
}

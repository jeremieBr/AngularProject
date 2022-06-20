import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject, takeUntil, tap, switchMap, map } from "rxjs";
import {
  InfoMessage,
  TypeInfoMessage,
} from "../shared/models/infoMessage.model";
import {
  searchDetailsStock,
  StockMarket,
} from "../shared/models/stockMarket.model";
import { StockStoreService } from "../shared/services/stock-store.service";
import { StockService } from "../shared/services/stock.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  // Utils
  infoMsg?: InfoMessage;
  isloading: boolean = false;
  eTypeInfoMessage = TypeInfoMessage;

  // Form
  stockForm!: FormGroup;

  // Private
  private notifier = new Subject();

  constructor(
    private fb: FormBuilder,
    private stockService: StockService,
    private stockStoreService: StockStoreService
  ) {}

  ngOnInit(): void {
    this.stockForm = this.fb.group({
      stockName: [
        "",
        [Validators.required, Validators.minLength(1), Validators.maxLength(5)],
      ],
    });

    this.stockName?.valueChanges
      .pipe(takeUntil(this.notifier))
      .subscribe(() => (this.infoMsg = undefined));
  }

  get stockName() {
    return this.stockForm.get("stockName");
  }

  /**
   * Get the stock market with given symbol and show an info message
   */
  public addStock(): void {
    if (this.stockForm.valid) {
      const stockName = this.stockName?.value.toUpperCase();
      this.isloading = true;
      this.stockService
        .getBySymbol(stockName)
        .pipe(
          takeUntil(this.notifier),
          // Get description of stock
          switchMap((stock: StockMarket) =>
            this.stockService.getDescBySymbol(stockName).pipe(
              map((searchDetails: searchDetailsStock) => {
                if (searchDetails.count) {
                  stock.description = searchDetails.result[0].description;
                }
                return stock;
              })
            )
          ),
          // Show info message
          tap((stock: StockMarket) => {
            if (!stock.c) {
              this.infoMsg = {
                type: TypeInfoMessage.error,
                text: "The stock market does not exist",
              };
            } else {
              stock.symbol = stockName;
              const indexStock =
                this.stockStoreService.verifyExistingStock(stock);
              this.infoMsg = {
                type: TypeInfoMessage.success,
                text: `The stock market has been ${
                  indexStock !== -1 ? "updated" : "added"
                }`,
              };
            }
          })
        )
        // Stop loader and add new stock
        .subscribe({
          next: (stock: StockMarket) => {
            if (stock.c) {
              this.stockService.addStockToLocalStorage(stock);
            }
            this.isloading = false;
          },
          error: () => {
            this.isloading = false;
          },
        });
    }
  }

  ngOnDestroy() {
    this.notifier.next("");
    this.notifier.complete();
  }
}

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject, takeUntil, tap } from "rxjs";
import {
  InfoMessage,
  TypeInfoMessage,
} from "../shared/models/infoMessage.model";
import { StockMarket } from "../shared/models/stockMarket.model";
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

  constructor(private fb: FormBuilder, private stockService: StockService) {}

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
          tap((stock: StockMarket) => {
            if (!stock.c) {
              this.infoMsg = {
                type: TypeInfoMessage.error,
                text: "The stock market does not exist",
              };
            } else {
              stock.symbol = stockName;
              const indexStock = this.stockService.verifyExistingStock(stock);
              this.infoMsg = {
                type: TypeInfoMessage.success,
                text: `The stock market has been ${
                  indexStock !== -1 ? "updated" : "added"
                }`,
              };
            }
          })
        )
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

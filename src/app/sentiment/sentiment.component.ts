import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { environment } from "src/environments/environment";
import { Month } from "../shared/enums/month.enum";
import { ResultSentiment, Sentiment } from "../shared/models/sentiment.model";
import { StockMarket } from "../shared/models/stockMarket.model";
import { StockService } from "../shared/services/stock.service";

const NB_MONTH_TO_DISPLAY = 3;

@Component({
  selector: "app-sentiment",
  templateUrl: "./sentiment.component.html",
  styleUrls: ["./sentiment.component.scss"],
})
export class SentimentComponent implements OnInit {
  sentiments!: Sentiment[];
  monthsToDisplay!: number[];
  monthEnum = Month;
  stock?: StockMarket;

  // Private
  private notifier = new Subject();

  constructor(
    private route: ActivatedRoute,
    private stockService: StockService
  ) {}

  ngOnInit(): void {
    const symbol = this.route.snapshot.paramMap.get("symbol");
    this.getMonthsToDisplay(NB_MONTH_TO_DISPLAY);
    if (symbol) {
      this.stockService
        .getDetailsByMonths(NB_MONTH_TO_DISPLAY, symbol)
        .pipe(takeUntil(this.notifier))
        .subscribe((s: Sentiment[]) => (this.sentiments = s));
      this.stock = this.stockService
        .getStocks()
        .find((stock: StockMarket) => stock.symbol === symbol);
    }
  }

  ngOnDestroy() {
    this.notifier.next("");
    this.notifier.complete();
  }

  /**
   *
   * @param monthDuration Number of month to display since now.
   */
  private getMonthsToDisplay(monthDuration: number) {
    const month = new Date().getMonth();
    const monthsToDisplay: number[] = [];
    for (let i = 0; i < monthDuration; i++) {
      if (month - i >= 0) monthsToDisplay.push(month - i);
    }
    this.monthsToDisplay = monthsToDisplay.reverse();
  }
}

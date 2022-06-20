import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { StockMarket } from "src/app/shared/models/stockMarket.model";
import { StockService } from "src/app/shared/services/stock.service";

@Component({
  selector: "app-stock",
  templateUrl: "./stock.component.html",
  styleUrls: ["./stock.component.scss"],
})
export class StockComponent implements OnInit {
  @Input()
  stock!: StockMarket;

  @Output() removeItem: EventEmitter<StockMarket> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  public removeStock(stock: StockMarket): void {
    this.removeItem.emit(stock);
  }
}

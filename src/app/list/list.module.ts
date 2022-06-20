import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListComponent } from "./list.component";
import { StockComponent } from './stock/stock.component';

@NgModule({
  declarations: [ListComponent, StockComponent],
  imports: [CommonModule],
  exports: [ListComponent],
})
export class ListModule {}

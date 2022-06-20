import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListComponent } from "./list.component";
import { StockComponent } from "./stock/stock.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [ListComponent, StockComponent],
  imports: [CommonModule, RouterModule],
  exports: [ListComponent],
})
export class ListModule {}

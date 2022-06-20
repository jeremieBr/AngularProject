import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchComponent } from "./search.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  exports: [SearchComponent],
})
export class SearchModule {}

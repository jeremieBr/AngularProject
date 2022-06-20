import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SentimentComponent } from "./sentiment.component";
import { SentiementRoutingModule } from "./sentiment-routing.module";

@NgModule({
  declarations: [SentimentComponent],
  imports: [CommonModule, SentiementRoutingModule],
})
export class SentimentModule {}

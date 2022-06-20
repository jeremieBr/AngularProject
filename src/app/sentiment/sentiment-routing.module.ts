import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SentimentComponent } from "./sentiment.component";

const routes: Routes = [
  { path: ":symbol", component: SentimentComponent },
  { path: "**", redirectTo: "/" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SentiementRoutingModule {}

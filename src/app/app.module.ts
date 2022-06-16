import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SearchModule } from "./search/search.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { StockInterceptor } from "./shared/interceptors/stock.interceptor";

@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent, FooterComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule, SearchModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: StockInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

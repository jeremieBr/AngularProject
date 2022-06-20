import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { SearchModule } from "./search/search.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { StockInterceptor } from "./shared/interceptors/stock.interceptor";
import { ListModule } from "./list/list.module";

@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    SearchModule,
    ListModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: StockInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

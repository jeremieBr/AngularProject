import { TestBed } from "@angular/core/testing";

import { StockStoreService } from "./stock-store.service";

describe("Stock.StateService", () => {
  let service: StockStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockStoreService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});

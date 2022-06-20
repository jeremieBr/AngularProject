import { TestBed } from '@angular/core/testing';

import { StockInterceptor } from './stock.interceptor';

describe('StockInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      StockInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: StockInterceptor = TestBed.inject(StockInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

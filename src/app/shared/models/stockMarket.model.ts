export interface StockMarket {
  c: number; // Current price
  d: number; // Change
  dp: number; // Percent Change
  h: number; // High price of the day
  l: number; // Low price of the day
  o: number; // Opend price of the day
  pc: number; // Previous close price
  t: number; // Date of updated informations
  symbol: string; // symbol of stock market
  description: string; // symbol description
}

export interface searchDetailsStock {
  count: number; // Number of results
  result: searchResultDetailsStock[]; // Array of search results
}

export interface searchResultDetailsStock {
  description: string; // Symbol description
  displaySymbol: string; // Display symbol name
  symbol: string; // Unique symbol
  type: string; // Security type
}

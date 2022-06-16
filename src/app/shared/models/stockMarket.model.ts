export interface StockMarket {
  c: number; // Current price
  d: number; // Change
  dp: number; // Percent Change
  h: number; // High price of the day
  l: number; // Low price of the day
  o: number; // Opend price of the day
  pc: number; // Previous close price
  t: number; // Date of updated informations
}

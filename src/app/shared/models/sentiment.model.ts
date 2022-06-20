export interface Sentiment {
  change: number; // Net buying/selling from all insiders' transactions
  month: number; // Month
  mspr: number; // Monthly share purchase ration
  symbol: string; // Symbol
  year: number; // Year
}

export interface ResultSentiment {
  data: Sentiment[];
  symbol: string;
}

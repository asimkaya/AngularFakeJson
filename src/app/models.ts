export interface RandomQuoteContext {
  // The quote's category: 'dev', 'explicit'...
  category: string;
}

export interface Users {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  gender: boolean;
  ip_address: string;
}

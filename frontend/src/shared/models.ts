export interface Product {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
}

export interface Country {
  name: string;
  currency: Currency;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface CurrencyRate {
  rate: Record<string, number>;
}

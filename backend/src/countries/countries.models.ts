export interface Country {
  name: string;
  currency: Currency;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface CountryFromRestCountries {
  name: {
    official: string;
  };
  currencies: Record<string, { name: string; symbol: string }>;
}

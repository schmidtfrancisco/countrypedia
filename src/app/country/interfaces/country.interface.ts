export interface Country {
  code: string;
  name: string;
  capital: Capital;
  region: string;
  subregion: string;
  population: number;
  area: number;
  currency: Currency;
  languages: Language[]
  flagSvg: string;
}

export interface Capital {
  name: string;
  latitude: number;
  longitude: number;
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export interface Language {
  name: string;
  nativeName: string;
}
export interface Country {
  fifaCode: string;
  name: string;
  capital: Capital;
  region: string;
  population: number;
  flagSvg: string
}

export interface Capital {
  name: string;
  latitude: number;
  longitude: number;
}
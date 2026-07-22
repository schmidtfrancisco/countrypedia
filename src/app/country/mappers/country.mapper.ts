import { Capital, Country } from "../interfaces/country.interface";
import { RestCountry } from "../interfaces/rest-countries.interface";

export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RestCountry): Country {
    const countryCapital: Capital = {
      name: restCountry.capitals[0]?.name ?? '',
      latitude: restCountry.capitals[0]?.coordinates.lat ?? 0,
      longitude: restCountry.capitals[0]?.coordinates.lng ?? 0
    }
    
    return {
      fifaCode: restCountry.codes.fifa,
      name: restCountry.names.translations['spa'].common ?? restCountry.names.common,
      capital: countryCapital,
      region: restCountry.region,
      population: restCountry.population,
      flagSvg: restCountry.flag.url_svg
    }
  }

  static mapRestCountriesToCountries(restCountries: RestCountry[]): Country[] {
    return restCountries.map(restCountry => this.mapRestCountryToCountry(restCountry));
  }
}
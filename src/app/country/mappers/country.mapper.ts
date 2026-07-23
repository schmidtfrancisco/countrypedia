import { Capital, Country, Currency } from "../interfaces/country.interface";
import { RestCountry } from "../interfaces/rest-countries.interface";

export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RestCountry): Country {
    const countryCapital: Capital = {
      name: restCountry.capitals[0]?.name ?? '',
      latitude: restCountry.capitals[0]?.coordinates.lat ?? 0,
      longitude: restCountry.capitals[0]?.coordinates.lng ?? 0
    }

    const countryCurrency: Currency = {
      code: restCountry.currencies[0]?.code ?? 'No info.',
      symbol: restCountry.currencies[0]?.symbol ?? 'No info',
      name: restCountry.currencies[0]?.name ?? 'No info'
    }

    const countryLanguages = restCountry.languages.map((lng) => ({ name: lng.name, nativeName: lng.native_name }));
    
    return {
      code: restCountry.codes.alpha_3,
      name: restCountry.names.translations['spa'].common ?? restCountry.names.common,
      capital: countryCapital,
      region: restCountry.region,
      subregion: restCountry.subregion,
      population: restCountry.population,
      area: restCountry.area.kilometers,
      currency: countryCurrency,
      languages: countryLanguages,
      flagSvg: restCountry.flag.url_svg
    }
  }

  static mapRestCountriesToCountries(restCountries: RestCountry[]): Country[] {
    return restCountries.map(restCountry => this.mapRestCountryToCountry(restCountry));
  }
}
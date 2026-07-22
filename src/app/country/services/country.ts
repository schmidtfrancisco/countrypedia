import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { RestCountryResponse } from '../interfaces/rest-countries.interface';
import { map, catchError, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';


@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string) {
    return this.searchCountriesBy('capitals', query);    
  }

  searchByCountry(query: string) {
    return this.searchCountriesBy('name', query);
  }

  private searchCountriesBy(param: string, query: string) {
    const lowerCaseQuery = query.toLowerCase();
    return this.http.get<RestCountryResponse>(`${environment.rest_countries_url}/${param}`, {
      params: {
        q: lowerCaseQuery,
      },
      headers: {
        'Authorization': `Bearer ${environment.rest_countries_api_key}`
      }
    }).pipe(
      map(({data}) => data.objects),
      map((restCountries) => CountryMapper.mapRestCountriesToCountries(restCountries)),
      catchError(error => {
        console.log('Error fetching', error);
        return throwError(() => new Error('No se encontraron países'))
      })
    );
  }
}

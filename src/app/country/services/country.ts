import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Country } from '../interfaces/country.interface';
import { RestCountryResponse } from '../interfaces/rest-countries.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Region } from '../types/region.type';


@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();

  searchByCapital(query: string) {
    if (this.queryCacheCapital.has(query.toLowerCase())) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }
    return this.searchCountriesBy('capitals', query).pipe(
      tap((countries) => this.queryCacheCapital.set(query.toLowerCase(), countries))
    );
  }

  searchByCountry(query: string) {
    if (this.queryCacheCountry.has(query.toLowerCase())) {
      return of(this.queryCacheCountry.get(query));
    }
    return this.searchCountriesBy('name', query).pipe(
      tap((countries) => this.queryCacheCountry.set(query.toLowerCase(), countries))
    );
  }

  searchByCode(code: string) {
    return this.searchCountryBy('code', code);
  }

  searchByRegion(region: Region) {
    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region));
    }
    return this.searchCountriesBy('region', region).pipe(
      tap((countries) => this.queryCacheRegion.set(region, countries))
    );
  }

  private searchCountriesBy(param: string, query: string): Observable<Country[]> {
    const lowerCaseQuery = query.toLowerCase();

    return this.http.get<RestCountryResponse>(`${environment.rest_countries_url}/${param}`, {
      params: {
        q: lowerCaseQuery,
        limit: 100,
      },
      headers: {
        'Authorization': `Bearer ${environment.rest_countries_api_key}`
      }
    }).pipe(
      map(({ data }) => data.objects),
      map((restCountries) => CountryMapper.mapRestCountriesToCountries(restCountries)),
      catchError(error => {
        console.log('Error fetching', error);
        return throwError(() => new Error('No se encontraron países'))
      })
    );
  }

  private searchCountryBy(param: string, code: string): Observable<Country | undefined> {
    return this.http.get<RestCountryResponse>(`${environment.rest_countries_url}/${param}`, {
      params: {
        q: code,
        limit: 100,
      },
      headers: {
        'Authorization': `Bearer ${environment.rest_countries_api_key}`
      }
    }).pipe(
      map(({ data }) => data.objects),
      map((restCountries) => CountryMapper.mapRestCountriesToCountries(restCountries)),
      map((countries) => countries.at(0)),
      catchError(error => {
        console.log('Error fetching', error);
        return throwError(() => new Error('No se encontraron países'))
      })
    );
  }
}

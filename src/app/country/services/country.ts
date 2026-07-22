import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { RestCountryResponse } from '../interfaces/rest-countries.interface';


@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string) {
    const lowerCaseQuery = query.toLowerCase();

    return this.http.get<RestCountryResponse>(`${environment.rest_countries_url}/capitals`, {
      params: {
        q: lowerCaseQuery,
      },
      headers: {
        'Authorization': `Bearer ${environment.rest_countries_api_key}`
      }
    })
  }
}

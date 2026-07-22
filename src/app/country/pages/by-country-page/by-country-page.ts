import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { List } from "../../components/list/list";
import { SearchInput } from "../../components/search-input/search-input";
import { CountryService } from '../../services/country';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInput, List],
  templateUrl: './by-country-page.html'
})
export class ByCountryPage {
  countryService = inject(CountryService);
  query = signal('');

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);
      
      return this.countryService.searchByCountry(params.query)
    } 
  });
}

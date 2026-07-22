import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { firstValueFrom, of } from 'rxjs';
import { List } from "../../components/list/list";
import { SearchInput } from "../../components/search-input/search-input";
import { CountryService } from '../../services/country';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, List],
  templateUrl: './by-capital-page.html'
})
export class ByCapitalPage {
  countryService = inject(CountryService);
  query = signal('');
  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);

      return this.countryService.searchByCapital(params.query)
    }
  });

  
  // countryResource = resource({
  //   params: () => ({ query: this.query() }),
  //   loader: async({ params }) => {
  //     if (!params.query) return [];

  //     return await firstValueFrom(
  //       this.countryService.searchByCapital(params.query)
  //     )
  //   }
  // });

  // isLoading = signal(false);
  // isError = signal<string|null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(query: string) {
  //   if (this.isLoading()) return;
  //   this.isLoading.set(true);
  //   this.isError.set(null);
  //   this.countryService.searchByCapital(query).subscribe({
  //     next: (countries) => {
  //       this.isLoading.set(false);
  //       this.countries.set(countries);
  //     },
  //     error: (err) => {
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(err);
  //     }
  //   })
  // }
}

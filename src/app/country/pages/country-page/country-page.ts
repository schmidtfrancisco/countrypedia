import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country';
import { NotFound } from '../../../shared/components/not-found/not-found';
import { CountryInformation } from './country-information/country-information';

@Component({
  selector: 'app-country-page',
  imports: [NotFound, CountryInformation],
  templateUrl: './country-page.html'
})
export class CountryPage {
  countryService = inject(CountryService);
  countryCode = inject(ActivatedRoute).snapshot.params['code'];

  countryResource = rxResource({
    params: () => ({ code: this.countryCode }),
    stream: ({ params }) => {
      return this.countryService.searchByCode(params.code)
    }
  });
}

import { Component, inject, signal } from '@angular/core';
import { List } from "../../components/list/list";
import { Region } from '../../types/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryService } from '../../services/country';

@Component({
  selector: 'app-by-region-page',
  imports: [List],
  templateUrl: './by-region-page.html'
})
export class ByRegionPage {
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];
  selectedRegion = signal<Region|null>(null);
  countryService = inject(CountryService);

  countryResource = rxResource({
    params: () => ({ region: this.selectedRegion() }),
    stream: ({ params }) => {
      if (!params.region) return of([]);
      return this.countryService.searchByRegion(params.region);
    }
  })
}

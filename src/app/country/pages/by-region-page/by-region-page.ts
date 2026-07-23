import { Component, inject, linkedSignal, signal } from '@angular/core';
import { List } from "../../components/list/list";
import { Region } from '../../types/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryService } from '../../services/country';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(queryParam: string): Region {
  queryParam = queryParam.toLowerCase();
  const validRegions: Record<string, Region> = {
    'africa': 'Africa',
    'americas': 'Americas',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania': 'Oceania',
    'antarctic': 'Antarctic',
  }

  return validRegions[queryParam] ?? 'Africa';
}

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
  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';
  selectedRegion = linkedSignal<Region>(() => validateQueryParam(this.queryParam));
  

  countryResource = rxResource({
    params: () => ({ region: this.selectedRegion() }),
    stream: ({ params }) => {
      if (!params.region) return of([]);
      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: params.region
        }
      })

      return this.countryService.searchByRegion(params.region);
    }
  })
}

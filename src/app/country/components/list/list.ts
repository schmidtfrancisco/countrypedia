import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RestCountry } from '../../interfaces/rest-countries.interface';

@Component({
  selector: 'country-list',
  imports: [],
  templateUrl: './list.html'
})
export class List {
  countries = input.required<RestCountry[]>();
}

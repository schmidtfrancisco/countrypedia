import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { List } from "../../components/list/list";

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInput, List],
  templateUrl: './by-country-page.html'
})
export class ByCountryPage {
  onSearch(value: string) {
    console.log(value);
  }
}

import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html'
})
export class SearchInput {
  placeholder = input<string>('Buscar');
  searchValue = output<string>();

  search(query: string) {
    this.searchValue.emit(query);
  }
}

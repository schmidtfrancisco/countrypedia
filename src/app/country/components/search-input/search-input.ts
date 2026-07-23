import { ChangeDetectionStrategy, Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html'
})
export class SearchInput {
  placeholder = input<string>('Buscar');
  initialSearchValue = input<string>();
  searchValue = output<string>();
  
  inputValue = linkedSignal<string>(() => this.initialSearchValue() ?? '');

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.searchValue.emit(value);
    }, 500);

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });

  
}

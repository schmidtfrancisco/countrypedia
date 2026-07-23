import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html'
})
export class SearchInput {
  placeholder = input<string>('Buscar');
  searchValue = output<string>();
  inputValue = signal<string>('');

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

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { List } from "../../components/list/list";

@Component({
  selector: 'app-by-region-page',
  imports: [List],
  templateUrl: './by-region-page.html'
})
export class ByRegionPage {
  onSearch(value: string) {
    console.log(value);
  } 
}

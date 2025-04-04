import { Component, inject, OnInit, signal, effect } from '@angular/core';
import { CoreApiService } from '../services/core-api.service';
import { catchError } from 'rxjs';
import { Work } from '../model/core-api.type';
import { FormsModule } from '@angular/forms';
import { debouncedSignal } from '../utils/signal-utils';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  coreApiService = inject(CoreApiService);
  coreItems = signal<Work[]>([]);
  coreSearchTerm = signal('');
  searchQuery = debouncedSignal(this.coreSearchTerm, 300, '');

  constructor() {
    effect(() => {
      if (!!this.searchQuery()) {
        this.searchCoreApi(this.searchQuery());
      }
    });
  }

  searchCoreApi = (searchTerm: string) => {
    this.coreApiService
      .searchPapers(searchTerm, 15)
      .pipe(
        catchError((err) => {
          // note: look in to error handling
          console.log(err);
          throw err;
        })
      )
      .subscribe((coreEntity) => {
        console.warn('the works', coreEntity);
        this.coreItems.set(coreEntity.results);
      })
  }
}

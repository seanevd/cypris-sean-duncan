import { Component, inject, OnInit, signal, effect } from '@angular/core';
import { CoreApiService } from '../services/core-api.service';
import { catchError } from 'rxjs';
import { Work } from '../model/core-api.type';
import { FormsModule } from '@angular/forms';
import { debouncedSignal } from '../utils/signal-utils';
import { CORE_API_REQUEST_LIMIT } from '../constants';

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
  corePageSize = signal(CORE_API_REQUEST_LIMIT);
  searchQuery = debouncedSignal(this.coreSearchTerm, 300, '');

  private searchEffect = effect(() => {
    if (!!this.searchQuery()) {
      this.searchCoreApi(this.searchQuery(), this.corePageSize());
    }
  });

  searchCoreApi = (searchTerm: string, pageSize: number) => {
    this.coreApiService
      .searchPapers(searchTerm, pageSize)
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

import { Component, inject, OnInit, signal } from '@angular/core';
import { CoreApiService } from '../services/core-api.service';
import { catchError } from 'rxjs';
import { Work } from '../model/core-api.type';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  coreApiService = inject(CoreApiService);
  coreItems = signal<Work[]>([]);

  ngOnInit(): void {
    this.coreApiService
      .searchPapers('drone', 15)
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

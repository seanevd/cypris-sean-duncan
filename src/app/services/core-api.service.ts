import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreEntity } from '../model/core-api.type';

@Injectable({
  providedIn: 'root'
})
export class CoreApiService {
  private apiUrl = 'https://api.core.ac.uk/v3/search/works';

  constructor(private http: HttpClient) { }

  searchPapers(query: string, pageSize: number = 10): Observable<CoreEntity> {
    const params = new HttpParams()
      .set('q', query)
      .set('limit', pageSize.toString());

    return this.http.get<CoreEntity>(this.apiUrl, { params });
  }
}

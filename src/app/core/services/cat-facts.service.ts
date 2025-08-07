import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatFactResponse, FactWithGifResponse, GifResponse, HistoryResponse } from '../models/api.models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CatFactsService {
  private apiUrl: string = environment.apiUrl + 'fact';

  constructor(private http: HttpClient) {}

  getFact(): Observable<CatFactResponse> {
    return this.http.get<CatFactResponse>(`${this.apiUrl}`);
  }

  getGif(query: string): Observable<GifResponse> {
    return this.http.get<GifResponse>(`${this.apiUrl}/gif?query=${query}`);
  }

  getFactWithGif(): Observable<FactWithGifResponse> {
    return this.http.get<FactWithGifResponse>(`${this.apiUrl}/with-gif`);
  }

  getHistory(): Observable<HistoryResponse> {
    return this.http.get<HistoryResponse>(`${this.apiUrl}/history`);
  }
}

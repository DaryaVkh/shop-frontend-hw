import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyRate } from '../shared/models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyApiService {
  private readonly requestUrlPrefix = '/api/rate';

  constructor(private readonly apiService: ApiService) {}

  public getCurrencyRate(symbol: string): Observable<CurrencyRate> {
    return this.apiService.get<CurrencyRate>(`${this.requestUrlPrefix}?symbol=${symbol}`);
  }
}

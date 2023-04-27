import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../shared/models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CountriesApiService {
  private readonly requestUrlPrefix = '/api/countries';

  constructor(private readonly apiService: ApiService) {}

  public getCountries(): Observable<Country[]> {
    return this.apiService.get<Country[]>(this.requestUrlPrefix);
  }
}

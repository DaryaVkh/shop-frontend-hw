import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../shared/models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {
  private readonly requestUrlPrefix = '/api/products';

  constructor(private readonly apiService: ApiService) {}

  public getProducts(): Observable<Product[]> {
    return this.apiService.get<Product[]>(this.requestUrlPrefix);
  }
}

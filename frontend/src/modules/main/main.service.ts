import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppPage } from './main.models';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  public readonly page$ = new BehaviorSubject<AppPage>(AppPage.PRODUCT_LIST);

  public changePage(newPage: AppPage): void {
    if (this.page$.getValue() !== newPage) {
      this.page$.next(newPage);
    }
  }
}

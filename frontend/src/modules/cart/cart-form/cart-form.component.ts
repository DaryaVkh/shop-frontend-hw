import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnDestroy, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TuiValidationError } from '@taiga-ui/cdk';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { of, shareReplay, Subject, switchMap, take, takeUntil } from 'rxjs';
import { map } from 'rxjs/operators';
import { CountriesApiService } from '../../../services/countries-api.service';
import { CurrencyApiService } from '../../../services/currency-api.service';
import { EMAIL_CONTROL_ERROR, ErrorCode, REQUIRED_CONTROL_ERROR } from '../../../shared/errors';
import { CurrencyRate } from '../../../shared/models';
import { AppPage } from '../../main/main.models';
import { MainService } from '../../main/main.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartFormComponent implements OnDestroy {
  @Output() chosenCountryRate = new EventEmitter<CurrencyRate>();

  public readonly cartForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    country: ['', Validators.required]
  });

  public readonly countries$ = this.countriesApiService.getCountries().pipe(
    shareReplay({bufferSize: 1, refCount: true})
  );
  public readonly rate$ = this.cartForm.get('country')?.valueChanges.pipe(
    switchMap((country) => {
      if (country) {
        const match = country.match(/\((.*?)\)/)?.[1];
        return this.currencyApiService.getCurrencyRate(match || 'USD');
      }
      return of(null);
    })
  );

  public readonly countriesForSelect$ = this.countries$.pipe(
    map((countries) => countries.map((country) => `${country.name} (${country.currency.code})`))
  );

  public submitted = false;

  public get nameError(): TuiValidationError | null {
    return this.getError('name', {
      [ErrorCode.REQUIRED]: REQUIRED_CONTROL_ERROR
    });
  }

  public get emailError(): TuiValidationError | null {
    return this.getError('email', {
      [ErrorCode.REQUIRED]: REQUIRED_CONTROL_ERROR,
      [ErrorCode.EMAIL]: EMAIL_CONTROL_ERROR
    });
  }

  public get addressError(): TuiValidationError | null {
    return this.getError('address', {
      [ErrorCode.REQUIRED]: REQUIRED_CONTROL_ERROR,
    });
  }

  public get countryError(): TuiValidationError | null {
    return this.getError('address', {
      [ErrorCode.REQUIRED]: REQUIRED_CONTROL_ERROR,
    });
  }

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly fb: FormBuilder,
              private readonly mainService: MainService,
              private readonly cartService: CartService,
              private readonly countriesApiService: CountriesApiService,
              private readonly currencyApiService: CurrencyApiService,
              @Inject(TuiAlertService) private readonly alerts: TuiAlertService) {}

  public ngOnInit(): void {
    this.cartForm.get('country')?.valueChanges.pipe(
      switchMap((country) => {
        if (country) {
          const match = country.match(/\((.*?)\)/)?.[1];
          return this.currencyApiService.getCurrencyRate(match || 'USD');
        }
        return of(null);
      }),
      takeUntil(this.destroy$)
    ).subscribe((rate) => {
      if (rate) {
        this.chosenCountryRate.emit(rate);
      }
    });
  }

  public submit(): void {
    this.submitted = true;
    if (this.cartForm.valid) {
      this.cartForm.reset();
      this.cartService.cleanCart();
      this.mainService.changePage(AppPage.PRODUCT_LIST);
      this.alerts.open('Your order successfully submitted!', {status: TuiNotification.Success}).pipe(
        take(1),
        takeUntil(this.destroy$)
      ).subscribe();
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getError(controlName: string, errorsMap: Record<string, string>): TuiValidationError | null {
    const control = this.cartForm.get(controlName);
    if (!control || (!control.touched && !this.submitted)) {
      return null;
    }
    for (const [error, msg] of Object.entries(errorsMap)) {
      if (control.hasError(error)) {
        return new TuiValidationError(msg);
      }
    }
    return null;
  }
}

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CurrenciesService {
  constructor(private readonly httpService: HttpService) {}

  public async getCurrencyRate(
    symbols: string,
  ): Promise<{ rate: Record<string, number> }> {
    const { data } = await firstValueFrom(
      this.httpService.get<{ rates: Record<string, number> }>(
        `https://api.exchangerate.host/latest?base=USD&symbols=${symbols}`,
      ),
    );
    return {
      rate: data.rates,
    };
  }
}

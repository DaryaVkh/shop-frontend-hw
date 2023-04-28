import { Controller, Get, Query } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';

@Controller()
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Get('rate')
  public async getCurrency(
    @Query('symbol') symbol: string,
  ): Promise<{ rate: Record<string, number> }> {
    return this.currenciesService.getCurrencyRate(symbol);
  }
}

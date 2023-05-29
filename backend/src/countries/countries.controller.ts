import { Controller, Get } from '@nestjs/common';
import { Country } from './countries.models';
import { CountriesService } from './countries.service';

@Controller()
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('countries')
  public async getCountries(): Promise<Country[]> {
    return this.countriesService.getCountries();
  }
}

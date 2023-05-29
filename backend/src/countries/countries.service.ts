import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Country, CountryFromRestCountries } from './countries.models';

@Injectable()
export class CountriesService {
  constructor(private readonly httpService: HttpService) {}

  public async getCountries(): Promise<Country[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<CountryFromRestCountries[]>(
        'https://restcountries.com/v3.1/all?fields=name,currencies',
      ),
    );
    return data
      .filter((country) => Object.keys(country.currencies).length !== 0)
      .map((country: CountryFromRestCountries) => {
        const currency = Object.entries(country.currencies)?.[0];
        return {
          name: country.name.official,
          currency: {
            code: currency[0],
            name: currency[1].name,
            symbol: currency[1].symbol,
          },
        };
      });
  }
}

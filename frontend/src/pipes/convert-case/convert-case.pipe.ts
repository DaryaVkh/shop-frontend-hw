import { Pipe, PipeTransform } from '@angular/core';

type Case = 'upper' | 'lower' | 'title';

@Pipe({
  name: 'convertCase'
})
export class ConvertCasePipe implements PipeTransform {
  public transform(value: string, neededCase: Case | null | undefined): string {
    switch (neededCase) {
      case 'upper':
        return value.toUpperCase();
      case 'lower':
        return value.toLowerCase();
      case 'title':
        return value.split(' ').map(word => `${word[0].toUpperCase()}${word.slice(1)}`).join(' ');
      default:
        return value;
    }
  }
}

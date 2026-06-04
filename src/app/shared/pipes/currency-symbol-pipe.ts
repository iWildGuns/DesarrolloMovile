import { Pipe, PipeTransform } from '@angular/core';
import { CURRENCY_SYMBOLS } from '../constants/currency-symbols.constant';

@Pipe({
  name: 'currencySymbol',
  standalone: true
})
export class CurrencySymbolPipe implements PipeTransform {

  transform(codigoMoneda: string): string {
    if (!codigoMoneda) return '';

    const code = codigoMoneda.toUpperCase();
        
    return CURRENCY_SYMBOLS[code] || code;
  }

}

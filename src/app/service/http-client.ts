import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICurrencyByDate, IResults } from 'src/types/results';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  public url: string = 'https://api.bcra.gob.ar/estadisticascambiarias/v1.0';

  constructor(public httpClient: HttpClient) {}

  getDivisa() {
    const data = this.httpClient.get<IResults>(`${this.url}/Maestros/Divisas`);
    return data;
  }

  getCurrencyByDate() {
    const data = this.httpClient.get<ICurrencyByDate>(
      `${this.url}/Cotizaciones?fecha=2024-06-12`,
    );
    return data;
  }
}

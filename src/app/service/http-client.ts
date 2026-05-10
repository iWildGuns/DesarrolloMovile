import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICotizaciones, ICurrencyByDate, IDivisas, IResults } from 'src/types/results';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  public url: string = 'https://api.bcra.gob.ar/estadisticascambiarias/v1.0';

  constructor(public httpClient: HttpClient) {}

  getDivisa() {
    const data = this.httpClient.get<IDivisas>(`${this.url}/Maestros/Divisas`);
    return data;
  }

  getCurrencyByDate(date: string) {
    const data = this.httpClient.get<ICotizaciones>(
      `${this.url}/Cotizaciones?fecha=${date}`,
    );

    return data;
  }
}

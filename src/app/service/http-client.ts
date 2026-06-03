import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDivisas, IResults } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  private readonly API_URL =
    'https://api.bcra.gob.ar/estadisticascambiarias/v1.0';

  constructor(private httpClient: HttpClient) {}

  getDivisa(): Observable<IDivisas> {
    return this.httpClient.get<IDivisas>(`${this.API_URL}/Maestros/Divisas`);
  }

  getCurrencyByDate(date: string): Observable<IDivisas> {
    return this.httpClient.get<IDivisas>(
      `${this.API_URL}/Cotizaciones?fecha=${date}`,
    );
  }

  getAllCurrencyDetails(): Observable<IDivisas> {
    return this.httpClient.get<IDivisas>(`${this.API_URL}/Cotizaciones`);
  }
  getCurrenciesBetweenDate(
    moneda: string,
    fechaDesde: string,
    fechaHasta: string,
  ) {
    const url = `${this.API_URL}/Cotizaciones/${moneda}?fechadesde=${fechaDesde}&fechahasta=${fechaHasta}`;

    const data = this.httpClient.get<IResults>(url);

    console.log(url);
    return data;
  }
  getLastCurrencyQuote(moneda: string): Observable<IDivisas> {
    return this.httpClient.get<IDivisas>(
      `${this.API_URL}/Cotizaciones/${moneda}?limit=10`,
    );
  }
}

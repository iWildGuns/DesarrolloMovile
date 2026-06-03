import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDivisa, IDivisas, IResults } from 'src/types';

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

  filterCurrencies(list: (IResults | IDivisa)[], searchTerm: string): any[] {
    if (!list || !searchTerm.trim()) {
      return list;
    }

    const term = searchTerm.toLowerCase().trim();

    return list.filter((item) => {
      let codigo = '';
      let nombre = '';

      if ('codigoMoneda' in item) {
        // Si el objeto es de tipo IDivisa
        codigo = item.codigoMoneda || '';
        nombre = item.descripcion || '';
      } else {
        // Si el objeto es de tipo IResults
        codigo = item.codigo || '';
        nombre = item.denominacion || '';
      }

      // Retorna true si el término coincide con el código o el nombre/descripción
      return (
        codigo.toLowerCase().includes(term) ||
        nombre.toLowerCase().includes(term)
      );
    });
  }
}

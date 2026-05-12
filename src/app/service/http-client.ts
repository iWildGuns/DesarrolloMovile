import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDivisas, ICotizaciones } from 'src/types';
import { ICurrencyByDate, IResults } from 'src/types/index';

/**
 * Servicio HTTP para comunicarse con la API del BCRA
 * Maneja todas las peticiones relacionadas con divisas y cotizaciones
 */
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

  /**
   * Obtiene las cotizaciones de una fecha específica
   * @param date Fecha en formato YYYY-MM-DD
   */

  getCurrencyByDate(date: string): Observable<ICotizaciones> {
    return this.httpClient.get<ICotizaciones>(
      `${this.API_URL}/Cotizaciones?fecha=${date}`,
    );
  }

  getAllCurrencyDetails(): Observable<ICotizaciones> {
    return this.httpClient.get<ICotizaciones>(`${this.API_URL}/Cotizaciones`);
  }
  getCurrenciesBetweenDate(moneda: string, fechaDesde: string, fechaHasta: string) {
  const url =
    `${this.API_URL}/Cotizaciones/${moneda}?fechadesde=${fechaDesde}&fechahasta=${fechaHasta}`;

  const data = this.httpClient.get<ICurrencyByDate>(url);

  console.log(url); 
  return data;
}
}

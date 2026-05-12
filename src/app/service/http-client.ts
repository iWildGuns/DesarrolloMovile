import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDivisas, ICotizaciones } from 'src/types';

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
}

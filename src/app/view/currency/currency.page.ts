import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClientService } from 'src/app/service/http-client';
import { IResults, IDetalle } from 'src/types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.page.html',
  styleUrls: ['./currency.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CurrencyPage implements OnInit, OnDestroy {
  // ============ PROPIEDADES ============
  currencies: IResults[] = [];
  filteredCurrencies: IResults[] = [];
  selectedCurrency: IResults | undefined = undefined;
  quotation: IDetalle | undefined = undefined;

  searchTerm: string = '';
  selectedDate: string = this.getLocalDate();
  errorMessage: string = '';

  private destroy$ = new Subject<void>();

  // ============ CONSTRUCTOR ============
  constructor(private httpService: HttpClientService) {}

  // ============ LIFECYCLE ============
  ngOnInit(): void {
    this.loadCurrencies();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ============ MÉTODOS PRINCIPALES ============
  /**
   * Carga la lista de divisas disponibles desde la API
   */
  private loadCurrencies(): void {
    this.httpService
      .getDivisa()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resp) => this.handleCurrenciesResponse(resp),
        error: () => this.handleError('Error al cargar las divisas'),
      });
  }

  /**
   * Carga la cotización para la divisa y fecha seleccionada
   */
  private loadQuotation(): void {
    if (!this.selectedCurrency) return;

    const formattedDate = this.selectedDate.split('T')[0];

    this.httpService
      .getCurrencyByDate(formattedDate)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resp) => this.handleQuotationResponse(resp),
        error: () =>
          this.handleError(
            'Ocurrió un error al obtener la cotización. No se pueden obtener cotizaciones posteriores al día de la fecha.',
          ),
      });
  }

  // ============ MANEJADORES DE EVENTOS ============
  /**
   * Filtra las divisas basado en el término de búsqueda
   */
  filterCurrencies(event: any): void {
    const value = event.target.value.toLowerCase();
    this.filteredCurrencies = this.currencies.filter((currency) =>
      currency.codigo?.toLowerCase().includes(value),
    );
  }

  /**
   * Selecciona una divisa y carga su cotización
   */
  selectCurrency(currency: IResults): void {
    this.selectedCurrency = currency;
    this.loadQuotation();
  }

  /**
   * Cambia la fecha seleccionada y recarga la cotización
   */
  changeDate(event: any): void {
    this.selectedDate = event.detail.value;
    this.loadQuotation();
  }

  // ============ MÉTODOS AUXILIARES ============
  /**
   * Obtiene la fecha local en formato ISO
   */
  private getLocalDate(): string {
    const date = new Date();
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString();
  }

  /**
   * Maneja la respuesta de divisas
   */
  private handleCurrenciesResponse(resp: any): void {
    this.currencies = resp.results;
    this.filteredCurrencies = this.currencies;

    // Selecciona USD por defecto
    this.selectedCurrency = this.currencies.find((c) =>
      c.codigo?.toLowerCase().includes('usd'),
    );

    this.loadQuotation();
  }

  /**
   * Maneja la respuesta de cotizaciones
   */
  private handleQuotationResponse(resp: any): void {
    this.errorMessage = '';

    // Valida datos
    if (!resp.results?.fecha || !resp.results?.detalle?.length) {
      this.quotation = undefined;
      this.errorMessage =
        'No hay cotizaciones disponibles para la fecha seleccionada. La fecha debe corresponder a un día hábil.';
      return;
    }

    // Busca la moneda seleccionada
    const currencyFound = resp.results.detalle.find(
      (c: IDetalle) => c.codigoMoneda === this.selectedCurrency?.codigo,
    );

    if (!currencyFound) {
      this.quotation = undefined;
      this.errorMessage =
        'No se encontró cotización para la moneda seleccionada.';
      return;
    }

    this.quotation = currencyFound;
  }

  /**
   * Maneja errores comunes
   */
  private handleError(message: string): void {
    this.quotation = undefined;
    this.errorMessage = message;
  }
}

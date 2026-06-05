import {
  IonLabel,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonSpinner,
  IonItem,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
  IonContent,
  IonList,
  IonSearchbar,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { calendar } from 'ionicons/icons';
import { CurrencySymbolPipe } from 'src/app/shared/pipes/currency-symbol-pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnDestroy } from '@angular/core';
import { HttpClientService } from 'src/app/service/http-client';
import { IResults, IDivisa, IDivisas } from 'src/types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.page.html',
  styleUrls: ['./currency.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItem,
    IonLabel,
    IonDatetime,
    IonDatetimeButton,
    IonModal,
    IonSpinner,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonText,
    IonContent,
    IonList,
    IonSearchbar,
    IonIcon,
    CommonModule,
    FormsModule,
    CurrencySymbolPipe,
  ],
})
export class CurrencyPage implements OnDestroy {
  currencies: IResults[] = [];
  filteredCurrencies: IResults[] = [];
  selectedCurrency: IResults | undefined = undefined;
  quotation: IDivisa | undefined = undefined;
  isLoading: boolean = false;
  maxDate: string = new Date().toISOString().split('T')[0];
  searchTerm: string = '';
  selectedDate: string = this.getLocalDate();
  errorMessage: string = '';

  private destroy$ = new Subject<void>();

  /**
   * Constructor: Inyecta el servicio HTTP para consultar la API de divisas.
   */

  constructor(private httpService: HttpClientService) {
    addIcons({ calendar });
  }

  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    return utcDay !== 0 && utcDay !== 6;
  };

  /**
   * @function ionViewWillEnter: Hook de Ionic que se ejecuta cada vez que la vista está por entrar.
   * Carga la lista de divisas cada vez que se muestra la página.
   */

  ionViewWillEnter(): void {
    this.loadCurrencies();
  }

  /**
   * @function ngOnDestroy: Se ejecuta al destruir el componente.
   * Emite una señal y completa el Subject para cancelar todas las suscripciones activas
   * y evitar pérdidas de memoria.
   */

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * loadCurrencies: Carga todas las divisas desde el servicio HTTP.
   * Usa takeUntil con destroy$ para cancelar la suscripción si el componente se destruye antes de recibir la respuesta.
   * En caso de éxito, llama a handleCurrenciesResponse; en caso de error, muestra mensaje genérico.
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
   * @function loadQuotation: Carga la cotización de la moneda seleccionada para la fecha elegida.
   * Solo se ejecuta si hay una moneda seleccionada.
   * Activa isLoading para mostrar un spinner.
   * Formatea la fecha (elimina la parte de hora) antes de enviarla al servicio.
   * Maneja la respuesta con handleQuotationResponse y en caso de error muestra un mensaje específico.
   */

  private loadQuotation(): void {
    if (!this.selectedCurrency) return;
    this.isLoading = true;

    const formattedDate = this.selectedDate.split('T')[0];

    this.httpService
      .getCurrencyByDate(formattedDate)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resp) => {
          this.handleQuotationResponse(resp);
          this.isLoading = false;
        },
        error: () => {
          this.handleError(
            'Ocurrió un error al obtener la cotización. No se pueden obtener cotizaciones posteriores al día de la fecha.',
          );
          this.isLoading = false;
        },
      });
  }

  filterCurrencies(event: any): void {
    const value = event.detail.value || '';

    this.filteredCurrencies = this.httpService.filterCurrencies(
      this.currencies,
      value,
    );
  }

  selectCurrency(currency: IResults): void {
    this.selectedCurrency = currency;
    this.loadQuotation();
  }

  changeDate(event: any): void {
    this.selectedDate = event.detail.value;
    this.loadQuotation();
  }

  private getLocalDate(): string {
    const date = new Date();
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString();
  }

  private handleCurrenciesResponse(resp: IDivisas): void {
    this.currencies = resp.results;
    this.filteredCurrencies = this.currencies;

    this.selectedCurrency = this.currencies.find((c) => c.codigo === 'USD');

    this.loadQuotation();
  }

  private handleQuotationResponse(resp: IDivisas): void {
    this.errorMessage = '';

    if (
      !resp.results ||
      !('fecha' in resp.results) ||
      !(resp.results as any)?.detalle?.length
    ) {
      this.quotation = undefined;
      this.errorMessage =
        'No hay cotizaciones disponibles para la fecha seleccionada. La fecha debe corresponder a un día hábil.';
      return;
    }

    const currencyFound = (resp.results as any).detalle.find(
      (c: IDivisa) => c.codigoMoneda === this.selectedCurrency?.codigo,
    );

    if (!currencyFound) {
      this.quotation = undefined;
      this.errorMessage =
        'No se encontró cotización para la moneda seleccionada.';
      return;
    }

    this.quotation = currencyFound;
  }

  private handleError(message: string): void {
    this.quotation = undefined;
    this.errorMessage = message;
  }

  trackByFn(index: number, item: IResults): string {
    return item.codigo || index.toString();
  }
}

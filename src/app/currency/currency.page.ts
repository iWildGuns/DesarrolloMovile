import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../service/http-client';
import { IDetalle, IResults } from 'src/types/results';


@Component({
  selector: 'app-currency',
  templateUrl: './currency.page.html',
  styleUrls: ['./currency.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
})
export class CurrencyPage implements OnInit {
  currencies: IResults[] = [];
  filteredCurrencies: IResults[] = [];

  selectedCurrency: IResults | undefined = undefined;

  searchTerm: string = '';

  // Adaptacion a Hora y Fecha ARG
  selectedDate: string = this.getLocalDate();

  quotation: IDetalle | undefined = undefined;

  errorMessage: string = '';

  constructor(private httpService: HttpClientService) {}

  ngOnInit() {
    this.loadCurrencies();
  }

  loadCurrencies() {
    this.httpService.getDivisa().subscribe({
      next: (resp) => {
        this.currencies = resp.results;

        this.filteredCurrencies = this.currencies;

        // Busca USD por defecto
        this.selectedCurrency = this.currencies.find(
          (c) => c.codigo.toLowerCase().includes('usd')
        );

        this.loadQuotation()
      },
    });
  }

  filterCurrencies(event: any) {
    const value = event.target.value.toLowerCase();

    this.filteredCurrencies = this.currencies.filter((currency) =>
      currency.codigo.toLowerCase().includes(value)
    );
  }

  selectCurrency(currency: any) {
    this.selectedCurrency = currency;

    this.loadQuotation();
  }

  changeDate(event: any) {
    this.selectedDate = event.detail.value;

    this.loadQuotation();
  }

  getLocalDate(): string {
    const date = new Date();

    const offset = date.getTimezoneOffset();

    const localDate = new Date(date.getTime() - offset * 60000);

    return localDate.toISOString();
  }

  loadQuotation() {
    if (!this.selectedCurrency) return;

    const formattedDate = this.selectedDate.split('T')[0];

    this.httpService.getCurrencyByDate(formattedDate).subscribe({
      next: (resp) => {

        // Limpia mensaje anterior
        this.errorMessage = '';

        // Si no hay datos
        if (!resp.results.fecha || resp.results.detalle.length === 0) {
          this.quotation = undefined;

          this.errorMessage =
            'No hay cotizaciones disponibles para la fecha seleccionada. La fecha debe corresponder a un día hábil.';

          return;
        }

        const currencyFound = resp.results.detalle.find(
          (c: any) => c.codigoMoneda === this.selectedCurrency?.codigo
        );

        // Si no encuentra la moneda
        if (!currencyFound) {
          this.quotation = undefined;

          this.errorMessage =
            'No se encontró cotización para la moneda seleccionada.';

          return;
        }

        this.quotation = currencyFound;
      },

      error: () => {
        this.quotation = undefined;

        this.errorMessage =
          'Ocurrió un error al obtener la cotización. No se pueden obtener cotizaciones posteriores al día de la fecha.';
      },
    });
  }

}

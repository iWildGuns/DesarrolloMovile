import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientService } from 'src/app/service/http-client';
import { Chart } from 'chart.js/auto';
import { IDivisa } from 'src/types';

@Component({
  selector: 'app-currencies-between-dates',
  templateUrl: './currencies-between-dates.page.html',
  styleUrls: ['./currencies-between-dates.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class CurrenciesBetweenDatesPage implements OnInit {
  constructor(private httpClientService: HttpClientService) {}
  filteredDivisas: IDivisa[] = [];
  vistaSeleccionada: string = 'lista';
  chart: any;
  searchTerm: string = '';
  showResults: boolean = false;
  divisaSeleccionada: IDivisa | null = null;
  divisas: IDivisa[] = [];
  moneda: string = 'USD';
  fechaActual: string = new Date().toISOString().split('T')[0];
  fechaDesde: string = '';
  fechaHasta: string = '';
  data: any;
  ngOnInit() {
    const hoy = new Date();
    const anterior = new Date();
    anterior.setDate(hoy.getDate() - 7);
    this.fechaHasta = hoy.toISOString().split('T')[0];
    this.fechaDesde = anterior.toISOString().split('T')[0];
    this.httpClientService
      .getCurrenciesBetweenDate(this.moneda, this.fechaDesde, this.fechaHasta)
      .subscribe({
        next: (res) => {
          this.data = res;
          this.cargarDivisas();
        },
        error: (err) => {
          console.error('ERROR:', err);
        },
      });
  }
  validarFechas() {
    if (
      this.fechaDesde &&
      this.fechaHasta &&
      this.fechaDesde > this.fechaHasta
    ) {
      this.fechaHasta = this.fechaDesde;
    }
    if (this.fechaHasta && this.fechaHasta > this.fechaActual) {
      this.fechaHasta = this.fechaActual;
    }
  }
  buscarCotizaciones() {
    this.httpClientService
      .getCurrenciesBetweenDate(this.moneda, this.fechaDesde, this.fechaHasta)
      .subscribe({
        next: (res) => {
          console.log('resultados');
          console.log(res);
          this.data = res;
          if (this.chart) {
            this.chart.destroy();
          }
          this.crearGrafico();
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  crearGrafico() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart('miGrafico', {
      type: 'line',
      data: {
        labels: this.data.results.map((x: any) => x.fecha).reverse(),
        datasets: [
          {
            //label:'dolar',
            label: this.moneda,
            data: this.data.results.map(
              (x: any) => x.detalle[0].tipoCotizacion,
            ),
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: this.data.results[0].detalle[0].descripcion,
          },
        },
      },
    });
  }
  cargarDivisas() {
    this.httpClientService.getDivisa().subscribe({
      next: (res) => {
        console.log(res);
        this.divisas = res.results.map(
          (item: any): IDivisa => ({
            id: item.id,
            codigoMoneda: item.codigo,
            descripcion: item.denominacion,
            tipoPase: item.tipoPase,
            tipoCotizacion: item.tipoCotizacion,
          }),
        );
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  filterCurrencies(event: any) {
    const value = event.detail.value?.toLowerCase() || '';
    if (!value.trim()) {
      this.filteredDivisas = [];
      this.showResults = false;
      return;
    }
    this.filteredDivisas = this.divisas.filter(
      (divisa) =>
        divisa.codigoMoneda.toLowerCase().includes(value) ||
        divisa.descripcion.toLowerCase().includes(value),
    );
    this.showResults = true;
  }
  seleccionarDivisa(divisa: IDivisa) {
    console.log(divisa);
    this.divisaSeleccionada = divisa;
    this.moneda = this.divisaSeleccionada.codigoMoneda;
    this.filteredDivisas = [];
    this.showResults = false;
    this.searchTerm = `${divisa.codigoMoneda} - ${divisa.descripcion}`;
  }
}

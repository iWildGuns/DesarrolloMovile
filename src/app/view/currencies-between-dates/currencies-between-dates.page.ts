import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import{IonicModule} from '@ionic/angular';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HttpClientService } from 'src/app/service/http-client';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-currencies-between-dates',
  templateUrl: './currencies-between-dates.page.html',
  styleUrls: ['./currencies-between-dates.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule,IonicModule]
})
export class CurrenciesBetweenDatesPage implements OnInit {

  constructor(private httpClientService:HttpClientService) { }
  divisas: any[] = [];
  moneda: string = 'EUR';
fechaDesde: string = '';
fechaHasta: string = '';
data:any
  ngOnInit() {
  const hoy = new Date();
  const anterior = new Date();
  anterior.setDate(hoy.getDate() - 7);

  this.fechaHasta = hoy.toISOString().split('T')[0];
  this.fechaDesde = anterior.toISOString().split('T')[0];
    this.httpClientService.getCurrenciesBetweenDate(
    this.moneda,
    this.fechaDesde,
    this.fechaHasta
  ).subscribe({
    next: (res) => {
  this.data = res;
   this.cargarDivisas();
},
    error: (err) => {
      console.error('ERROR:', err);
    }
  });
  }
buscarCotizaciones() {
  this.httpClientService.getCurrenciesBetweenDate(
    this.moneda,
    this.fechaDesde,
    this.fechaHasta
  ).subscribe({
    next: (res) => {
      console.log(res);
      this.data = res;
      this.crearGrafico();
    },
    error: (err) => {
      console.error(err);
    }
  });
}
crearGrafico() {

    new Chart('miGrafico', {

      type: 'line',

      data: {

        labels: this.data.results.map(
        (x:any) => x.fecha
      ).reverse(),

        datasets: [
          {
            label: 'EUR',
            data: this.data.results.map(
            (x:any) => x.detalle[0].tipoCotizacion
          ),
            tension: 0.3
          }
        ]
      }

    });

  }
  cargarDivisas() {

  this.httpClientService.getDivisa()
    .subscribe({

      next: (res:any) => {

        console.log(res);

        this.divisas = res.results;

      },

      error: (err) => {

        console.error(err);

      }

    });

}
}

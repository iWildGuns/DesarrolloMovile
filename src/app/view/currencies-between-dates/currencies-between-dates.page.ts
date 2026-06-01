import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientService } from 'src/app/service/http-client';

@Component({
  selector: 'app-currencies-between-dates',
  templateUrl: './currencies-between-dates.page.html',
  styleUrls: ['./currencies-between-dates.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class CurrenciesBetweenDatesPage implements OnInit {
  constructor(private httpClientService: HttpClientService) {}
  moneda: string = 'EUR';
  fechaDesde: string = '';
  fechaHasta: string = '';
  data: any;
  ngOnInit() {
    this.httpClientService
      .getCurrenciesBetweenDate('EUR', '2024-06-12', '2024-06-14')
      .subscribe({
        next: (res) => {
          this.data = res;
        },
        error: (err) => {
          console.error('ERROR:', err);
        },
      });
  }
  buscarCotizaciones() {
    this.httpClientService
      .getCurrenciesBetweenDate(this.moneda, this.fechaDesde, this.fechaHasta)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.data = res;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}

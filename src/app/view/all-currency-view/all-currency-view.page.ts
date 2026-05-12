import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonIcon,
  IonCard,
  IonCardContent,
  IonSearchbar,
  IonContent,
} from '@ionic/angular/standalone';
import { HttpClientService } from 'src/app/service/http-client';
import { IDivisa, IResults } from 'src/types/index';

@Component({
  selector: 'app-all-currency-view',
  templateUrl: './all-currency-view.page.html',
  styleUrls: ['./all-currency-view.page.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonCard,
    IonIcon,
    CommonModule,
    FormsModule,
    IonSearchbar,
    IonContent,
  ],
})
export class AllCurrencyViewPage implements OnInit {
  results: IResults | null = null;
  divisasFiltradas: IDivisa[] = [];
  searchTerm: string = '';

  constructor(public proveedorService: HttpClientService) {}

  getData() {
    this.proveedorService.getAllCurrencyDetails().subscribe({
      next: (data: any) => {
        this.results = data.results;
        this.divisasFiltradas = data.results.detalle;
        this.divisasFiltradas.forEach((divisa, index) => {
          divisa.id = index;
        });
        console.log(this.results);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  get conCotizacion(): number {
    return (
      this.results?.detalle?.filter((d) => d.tipoCotizacion > 0).length ?? 0
    );
  }

  get sinCotizacion(): number {
    return (
      this.results?.detalle?.filter((d) => d.tipoCotizacion === 0).length ?? 0
    );
  }

  ngOnInit() {
    this.getData();
  }

  filtrar() {
    const term = this.searchTerm.toLowerCase();
    this.divisasFiltradas = (this.results?.detalle ?? []).filter(
      (d) =>
        d.codigoMoneda.toLowerCase().includes(term) ||
        d.descripcion.toLowerCase().includes(term),
    );
  }
}

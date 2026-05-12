import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { IDivisa, IResultsResponse } from 'src/types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
export class AllCurrencyViewPage implements OnInit, OnDestroy {
  results: IResultsResponse | null = null;
  divisasFiltradas: IDivisa[] = [];
  searchTerm: string = '';

  private destroy$ = new Subject<void>();

  constructor(private httpService: HttpClientService) {}

  ngOnInit(): void {
    this.loadCurrencyDetails();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadCurrencyDetails(): void {
    this.httpService
      .getAllCurrencyDetails()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => this.handleCurrencyDetailsResponse(data),
        error: (error) => this.handleError(error),
      });
  }

  filtrar(): void {
    const term = this.searchTerm.toLowerCase();
    this.divisasFiltradas = (this.results?.detalle ?? []).filter(
      (divisa) =>
        divisa.codigoMoneda.toLowerCase().includes(term) ||
        divisa.descripcion.toLowerCase().includes(term),
    );
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

  private handleCurrencyDetailsResponse(data: any): void {
    this.results = data.results;
    this.divisasFiltradas = data.results.detalle;

    this.divisasFiltradas.forEach((divisa, index) => {
      divisa.id = index;
    });
  }

  private handleError(error: any): void {
    console.error('Error al cargar divisas:', error);
  }
}

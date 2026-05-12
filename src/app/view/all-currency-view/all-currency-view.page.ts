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
  // ============ PROPIEDADES ============
  results: IResultsResponse | null = null;
  divisasFiltradas: IDivisa[] = [];
  searchTerm: string = '';

  private destroy$ = new Subject<void>();

  // ============ CONSTRUCTOR ============
  constructor(private httpService: HttpClientService) {}

  // ============ LIFECYCLE ============
  ngOnInit(): void {
    this.loadCurrencyDetails();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ============ MÉTODOS PRINCIPALES ============
  /**
   * Carga todos los detalles de divisas
   */
  private loadCurrencyDetails(): void {
    this.httpService
      .getAllCurrencyDetails()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => this.handleCurrencyDetailsResponse(data),
        error: (error) => this.handleError(error),
      });
  }

  // ============ MANEJADORES DE EVENTOS ============
  /**
   * Filtra las divisas basado en el término de búsqueda
   */
  filtrar(): void {
    const term = this.searchTerm.toLowerCase();
    this.divisasFiltradas = (this.results?.detalle ?? []).filter(
      (divisa) =>
        divisa.codigoMoneda.toLowerCase().includes(term) ||
        divisa.descripcion.toLowerCase().includes(term),
    );
  }

  // ============ GETTERS ============
  /**
   * Retorna la cantidad de divisas con cotización
   */
  get conCotizacion(): number {
    return (
      this.results?.detalle?.filter((d) => d.tipoCotizacion > 0).length ?? 0
    );
  }

  /**
   * Retorna la cantidad de divisas sin cotización
   */
  get sinCotizacion(): number {
    return (
      this.results?.detalle?.filter((d) => d.tipoCotizacion === 0).length ?? 0
    );
  }

  // ============ MÉTODOS AUXILIARES ============
  /**
   * Maneja la respuesta de detalles de divisas
   */
  private handleCurrencyDetailsResponse(data: any): void {
    this.results = data.results;
    this.divisasFiltradas = data.results.detalle;

    // Asigna índices a las divisas
    this.divisasFiltradas.forEach((divisa, index) => {
      divisa.id = index;
    });
  }

  /**
   * Maneja errores de las peticiones HTTP
   */
  private handleError(error: any): void {
    console.error('Error al cargar divisas:', error);
  }
}

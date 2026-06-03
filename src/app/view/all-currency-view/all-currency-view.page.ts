import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonIcon,
  IonCard,
  IonCardContent,
  IonSearchbar,
  IonContent,
  IonButton,
} from '@ionic/angular/standalone';
import { HttpClientService } from 'src/app/service/http-client';
import { FavoritesService } from 'src/app/service/favorites.service';
import { IDivisa, IResults } from 'src/types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { addIcons } from 'ionicons';
import { calendarOutline, star, starOutline } from 'ionicons/icons';

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
    IonButton,
  ],
})
export class AllCurrencyViewPage implements OnInit, OnDestroy {
  results: IResults | null = null;
  divisasFiltradas: IDivisa[] = [];
  searchTerm: string = '';
  favoritosSet: Set<string> = new Set();

  private destroy$ = new Subject<void>();

  constructor(
    private httpService: HttpClientService,
    private favoritesService: FavoritesService,
  ) {
    addIcons({ calendarOutline, star, starOutline });
  }

  ngOnInit(): void {
    this.loadCurrencyDetails();
    this.loadFavorites();
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

  private loadFavorites(): void {
    this.favoritesService
      .getFavorites()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (favorites) => {
          this.favoritosSet = new Set(favorites.map((f) => f.codigo));
        },
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

  isFavorite(codigoMoneda: string): boolean {
    return this.favoritosSet.has(codigoMoneda);
  }

  toggleFavorite(divisa: IDivisa): void {
    const codigo = divisa.codigoMoneda;

    if (this.isFavorite(codigo)) {
      this.favoritesService
        .removeFavorite(codigo)
        .catch((error) => console.error('Error removiendo favorito:', error));
    } else {
      this.favoritesService
        .addFavorite({
          codigo,
          denominacion: divisa.descripcion,
          posicion: 0,
        })
        .catch((error) => console.error('Error agregando favorito:', error));
    }
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

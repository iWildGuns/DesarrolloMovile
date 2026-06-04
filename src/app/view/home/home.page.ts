import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavoritesService } from 'src/app/service/favorites.service';
import { HttpClientService } from 'src/app/service/http-client';
import { IFavoriteCurrency, IDivisas } from 'src/types';

interface FavoriteCurrencyWithQuote extends IFavoriteCurrency {
  cotizacion?: number;
  loading?: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss', '../../app.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage implements OnInit {
  mostrar: boolean = false;
  favoritesCotizaciones: FavoriteCurrencyWithQuote[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private httpClientService: HttpClientService,
  ) {}

  ngOnInit(): void {
    this.loadFavoritesWithQuotes();
  }

  loadFavoritesWithQuotes(): void {
    this.favoritesService.getFavorites().subscribe((favorites) => {
      this.favoritesCotizaciones = favorites.map((fav) => ({
        ...fav,
        loading: true,
      }));

      favorites.forEach((favorite) => {
        this.getQuoteForFavorite(favorite.codigo);
      });
    });
  }

  getQuoteForFavorite(codigo: string): void {
    this.httpClientService.getLastCurrencyQuote(codigo).subscribe({
      next: (res: IDivisas) => {
        const cotizacion = res.results[0]?.detalle[0]?.tipoCotizacion || 0;
        const index = this.favoritesCotizaciones.findIndex(
          (f) => f.codigo === codigo,
        );
        if (index !== -1) {
          this.favoritesCotizaciones[index].cotizacion = cotizacion;
          this.favoritesCotizaciones[index].loading = false;
        }
      },
      error: (err) => {
        console.error(`Error fetching quote for ${codigo}:`, err);
        const index = this.favoritesCotizaciones.findIndex(
          (f) => f.codigo === codigo,
        );
        if (index !== -1) {
          this.favoritesCotizaciones[index].loading = false;
        }
      },
    });
  }
}

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonItem,
  IonMenu,
  IonList,
  IonLabel,
  IonToolbar,
  IonTitle,
  MenuController,
} from '@ionic/angular/standalone';

/**
 * Componente Menu
 * Menú lateral de navegación principal
 */
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [IonItem, IonToolbar, IonTitle, IonMenu, IonList, IonLabel],
})
export class MenuComponent {
  // ============ PROPIEDADES ============
  @Input() contentId: string = 'main-content';
  @Input() menuId: string = 'main-menu';

  // ============ CONSTRUCTOR ============
  constructor(
    private router: Router,
    private menuController: MenuController,
  ) {}

  // ============ MÉTODOS DE NAVEGACIÓN ============
  /**
   * Navega a la vista de todas las divisas
   */
  navegarADivisas(): void {
    this.router.navigate(['/all-currency-view']);
    this.cerrarMenu();
  }

  /**
   * Navega a la página de cotizaciones
   */
  navegarACotizaciones(): void {
    this.router.navigate(['/currency']);
    this.cerrarMenu();
  }

  /**
   * Navega a la página de login
   */
  navegarALogin(): void {
    this.router.navigate(['login']);
    this.cerrarMenu();
  }
/*Navegar a la pagina de cotizaciones entre dos fechas */
navegarACotizacionesEntreFechas(): void {
    this.router.navigate(['/currencies-between-dates']);
    this.cerrarMenu();
  }
  // ============ MÉTODOS AUXILIARES ============
  /**
   * Cierra el menú lateral
   */
  private cerrarMenu(): void {
    this.menuController.close(this.menuId);
  }
}

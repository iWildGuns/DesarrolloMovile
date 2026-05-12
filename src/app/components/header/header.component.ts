import { Component, Input } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

/**
 * Componente Header
 * Encabezado de la aplicación con acceso al menú principal
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton],
})
export class HeaderComponent {
  // ============ PROPIEDADES ============
  @Input() menuId: string = 'main-menu';

  // ============ CONSTRUCTOR ============
  constructor(private router: Router) {}

  // ============ MÉTODOS ============
  /**
   * Navega a la página de inicio
   */
  goHome(): void {
    this.router.navigate(['home']);
  }
}

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

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [IonItem, IonToolbar, IonTitle, IonMenu, IonList, IonLabel],
})
export class MenuComponent {
  @Input() contentId: string = 'main-content';
  @Input() menuId: string = 'main-menu';

  constructor(
    private router: Router,
    private menuController: MenuController,
  ) {}

  navegarADivisas(): void {
    this.router.navigate(['/all-currency-view']);
    this.cerrarMenu();
  }

  navegarACotizaciones(): void {
    this.router.navigate(['/currency']);
    this.cerrarMenu();
  }

  navegarALogin(): void {
    this.router.navigate(['login']);
    this.cerrarMenu();
  }

  navegarBetweenDate(): void {
    this.router.navigate(['/currency-between-date']);
    this.cerrarMenu();
  }

  private cerrarMenu(): void {
    this.menuController.close(this.menuId);
  }
}

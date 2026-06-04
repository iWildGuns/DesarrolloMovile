import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import {
  IonItem,
  IonMenu,
  IonList,
  IonLabel,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonToggle,
  MenuController,
} from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth-service';
import { ThemeService } from 'src/app/service/theme';
import { addIcons } from 'ionicons';
import {
  logOutOutline,
  homeOutline,
  cashOutline,
  calendarNumberOutline,
  calculatorOutline,
  calendarOutline,
  moon,
  sunny,
  gridOutline,
  restaurantOutline,
  receiptOutline,
  fastFoodOutline,
  cardOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [
    IonItem,
    IonToolbar,
    IonTitle,
    IonMenu,
    IonList,
    IonLabel,
    IonIcon,
    IonToggle,
    CommonModule,
    AmplifyAuthenticatorModule,
  ],
  standalone: true,
})
export class MenuComponent {
  @Input() contentId: string = 'main-content';
  @Input() menuId: string = 'main-menu';
  public isLoggedIn$!: Observable<boolean>;
  public themeService = inject(ThemeService);

  constructor(
    private router: Router,
    private menuController: MenuController,
    private authService: AuthService,
  ) {
    addIcons({
      logOutOutline,
      homeOutline,
      cashOutline,
      calendarNumberOutline,
      calendarOutline,
      calculatorOutline,
      moon,
      sunny,
      'grid-outline': gridOutline,
      'restaurant-outline': restaurantOutline,
      'receipt-outline': receiptOutline,
      'fast-food-outline': fastFoodOutline,
      'card-outline': cardOutline,
    });
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  goHome(): void {
    this.router.navigate(['']);
    this.cerrarMenu();
  }

  navegarADivisas(): void {
    this.router.navigate(['all-currency-view']);
    this.cerrarMenu();
  }

  navegarACotizaciones(): void {
    this.router.navigate(['currency']);
    this.cerrarMenu();
  }

  navegarALogin(): void {
    this.router.navigate(['login']);
    this.cerrarMenu();
  }

  navegarACotizacionesEntreFechas(): void {
    this.router.navigate(['app-currencies-between-dates']);
    this.cerrarMenu();
  }

  navegarACurrencyConverter(): void {
    this.router.navigate(['/currency-converter']);
    this.cerrarMenu();
  }

  handleAuthAction(isLoggedIn: boolean) {
    if (isLoggedIn) {
      this.authService.logout();
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  private cerrarMenu(): void {
    this.menuController.close(this.menuId);
  }
}

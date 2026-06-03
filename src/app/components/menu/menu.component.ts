import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import {
  IonItem,
  IonMenu,
  IonList,
  IonLabel,
  IonToolbar,
  IonTitle,
  MenuController,
  IonIcon,
} from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth-service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [
    IonIcon,
    IonItem,
    IonToolbar,
    IonTitle,
    IonMenu,
    IonList,
    IonLabel,
    CommonModule,
    AmplifyAuthenticatorModule,
  ],
  standalone: true,
})
export class MenuComponent {
  @Input() contentId: string = 'main-content';
  @Input() menuId: string = 'main-menu';
  public isLoggedIn$!: Observable<boolean>;

  constructor(
    private router: Router,
    private menuController: MenuController,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
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
  /*Navegar a la pagina de cotizaciones entre dos fechas */
  navegarACotizacionesEntreFechas(): void {
    this.router.navigate(['app-currencies-between-dates']);
    this.cerrarMenu();
  }
  // ============ MÉTODOS AUXILIARES ============
  /*
   * /*Navegar a la pagina de cotizaciones entre dos fechas */
  navegarACurrencyConverter(): void {
    this.router.navigate(['/currency-converter']);
    this.cerrarMenu();
  }
  // ============ MÉTODOS AUXILIARES ============
  /**
   * Cierra el menú lateral
   */

  // logOut(): void {
  //   this.authService.logout();
  //   this.cerrarMenu();
  // }
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

import { Component, inject, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet, IonContent } from '@ionic/angular/standalone';
import { MenuComponent } from './components/menu/menu.component';
import {
  AmplifyAuthenticatorModule,
  translations,
} from '@aws-amplify/ui-angular';
import { AuthService } from './service/auth-service';
import { Observable } from 'rxjs';
import { I18n } from 'aws-amplify/utils';
import { Router } from '@angular/router';
import { ThemeService } from './service/theme';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss',
  imports: [
    IonApp,
    IonRouterOutlet,
    MenuComponent,
    IonContent,
    AmplifyAuthenticatorModule,
  ],
  standalone: true,
})
export class AppComponent implements OnInit {
  public isLoggedIn$!: Observable<boolean>;
  title = 'My Cognito App';
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    I18n.putVocabularies(translations);

    I18n.setLanguage('es');

    I18n.putVocabulariesForLanguage('es', {
      Username: 'Correo Electrónico',
      'Enter your Username': 'Ingrese su Correo Electrónico',
      'Enter your Password': 'Ingrese su Contraseña',
      'Sign In': 'Iniciar Sesión',
      'Sign Up': 'Registrarse',
      'Email': 'Correo Electrónico',
      'Username should be an email.':
        'El nombre de usuario debe ser un correo electrónico.',
    });
  }

  handleAuthAction(isLoggedIn: boolean) {
    if (isLoggedIn) {
      this.authService.logout();
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}

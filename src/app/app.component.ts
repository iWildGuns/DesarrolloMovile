import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AmplifyAuthenticatorModule,
  translations,
} from '@aws-amplify/ui-angular';
import { IonApp, IonContent, IonRouterOutlet } from '@ionic/angular/standalone';
import { I18n } from 'aws-amplify/utils';
import { Observable } from 'rxjs';
import { MenuComponent } from './components/menu/menu.component';
import { AuthService } from './service/auth-service';

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

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  formFields = {
    signUp: {
      user: {
        type: 'nombre',
        label: 'Nombre de usuario',
        placeholder: 'Ingrese su Nombre De Usuario',
        isRequired: true,
        order: 4,
      },
    },
  };

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
      Email: 'Correo Electrónico',
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

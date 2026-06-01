import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet, IonContent } from '@ionic/angular/standalone';
import { MenuComponent } from './components/menu/menu.component';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { AuthService } from './service/auth-service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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

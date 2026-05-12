import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, RouterModule],
})
export class SignInPage {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    // lógica de login con email/password
  }

  loginWithGoogle() {
    // lógica de login con Google
  }

  forgotPassword() {
    // navegar a recuperar contraseña
  }

  goToRegister() {
    this.router.navigate(['/sign-up']);
  }
}

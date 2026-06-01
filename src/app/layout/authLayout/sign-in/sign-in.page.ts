// import { Component } from '@angular/core';
// import { IonicModule } from '@ionic/angular';
// import { FormsModule } from '@angular/forms';
// import { Router, RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-sign-in',
//   templateUrl: './sign-in.page.html',
//   styleUrls: ['./sign-in.page.scss'],
//   standalone: true,
//   imports: [IonicModule, FormsModule, RouterModule],
// })
// export class SignInPage {
//   email: string = '';
//   password: string = '';

//   constructor(private router: Router) {}

//   login() {
//     // lógica de login con email/password
//   }

//   loginWithGoogle() {
//     // lógica de login con Google
//   }

//   forgotPassword() {
//     this.router.navigate(['/forgot-password']);
//   }

//   goToRegister() {
//     this.router.navigate(['/sign-up']);
//   }
// }

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { signIn } from 'aws-amplify/auth';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonText,
  IonSpinner,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    IonText,
    IonSpinner,
  ],
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage {
  loginForm: FormGroup;
  showPassword = false;
  loading = false;
  serverError = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  loginWithGoogle() {}
  goToRegister() {
    this.router.navigate(['/sign-up']);
  }
  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  get emailInvalid(): boolean {
    const c = this.loginForm.get('email');
    return !!(c?.invalid && c?.touched);
  }

  get passwordInvalid(): boolean {
    const c = this.loginForm.get('password');
    return !!(c?.invalid && c?.touched);
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.serverError = '';

    const { email, password } = this.loginForm.value;

    try {
      await signIn({ username: email, password });
      this.router.navigate(['/home']);
    } catch (err: any) {
      this.serverError = err.message;
    } finally {
      this.loading = false;
    }
  }
}

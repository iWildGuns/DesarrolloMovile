//
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
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

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
    AmplifyAuthenticatorModule,
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
      // const result =
      const result = await signIn({ username: email, password });
      console.log('USERNAME', JSON.stringify(email));
      console.log('Password', JSON.stringify(password));
      console.log('SINGIN RESULT', result);
      this.router.navigate(['/home']);
    } catch (err: any) {
      console.error('ERROR COMPLETO:', err);
      console.error('NAME:', err?.name);
      console.error('MESSAGE:', err?.message);
      // console.error(JSON.stringify(err, null, 2));
      this.serverError = `${err?.name}: ${err?.message}`;
    } finally {
      this.loading = false;
    }
  }
}

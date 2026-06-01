//
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { signUp } from 'aws-amplify/auth';
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
  selector: 'app-sign-up',
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
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {
  hide = true;
  signUpForm: FormGroup;
  showPassword = false;
  loading = false;
  serverError = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.signUpForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatch },
    );
  }

  passwordsMatch(group: FormGroup) {
    const p = group.get('password')?.value;
    const c = group.get('confirmPassword')?.value;
    return p === c ? null : { mismatch: true };
  }

  get emailInvalid(): boolean {
    const c = this.signUpForm.get('email');
    return !!(c?.invalid && c?.touched);
  }

  get passwordInvalid(): boolean {
    const c = this.signUpForm.get('password');
    return !!(c?.invalid && c?.touched);
  }

  get confirmInvalid(): boolean {
    return !!(
      this.signUpForm.hasError('mismatch') &&
      this.signUpForm.get('confirmPassword')?.touched
    );
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  async onSubmit(): Promise<void> {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.serverError = '';

    const { name, email, password } = this.signUpForm.value;
    email.trim().toLowerCase();

    try {
      await signUp({
        username: email,
        password,
        options: {
          userAttributes: { name, email },
        },
      });

      // Cognito manda un código de verificación al email
      this.router.navigate(['/confirm-email'], {
        queryParams: { email },
      });
    } catch (err: any) {
      this.serverError = err.message;
    } finally {
      this.loading = false;
    }
  }

  goToSignIn(): void {
    this.router.navigate(['/sign-in']);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';

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
  selector: 'app-confirm-email',
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
  templateUrl: './confirm-email.page.html',
  styleUrls: ['./confirm-email.page.scss'],
})
export class ConfirmEmailPage implements OnInit {
  confirmForm: FormGroup;
  loading = false;
  resending = false;
  serverError = '';
  successMsg = '';
  email = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.confirmForm = this.fb.group({
      code: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
    });
  }

  ngOnInit(): void {
    // Recibe el email desde los queryParams del sign-up
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'] || '';
    });
  }

  get codeInvalid(): boolean {
    const c = this.confirmForm.get('code');
    return !!(c?.invalid && c?.touched);
  }

  async onSubmit(): Promise<void> {
    if (this.confirmForm.invalid) {
      this.confirmForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.serverError = '';

    const { code } = this.confirmForm.value;

    try {
      await confirmSignUp({ username: this.email, confirmationCode: code });
      this.router.navigate(['/sign-in']);
    } catch (err: any) {
      this.serverError = err.message;
    } finally {
      this.loading = false;
    }
  }

  async resendCode(): Promise<void> {
    if (!this.email) return;

    this.resending = true;
    this.serverError = '';
    this.successMsg = '';

    try {
      await resendSignUpCode({ username: this.email });
      this.successMsg = 'Código reenviado. Revisá tu correo.';
    } catch (err: any) {
      this.serverError = err.message;
    } finally {
      this.resending = false;
    }
  }

  goToSignIn(): void {
    this.router.navigate(['/sign-in']);
  }
}

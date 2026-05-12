import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginPage {
  loginForm: FormGroup;
  showPassword: boolean = false;
  loading: boolean = false;
  serverError: string = '';

  constructor(
    private auth: Auth,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get emailInvalid(): boolean {
    const control = this.loginForm.get('email');
    return !!(control?.invalid && control?.touched);
  }

  get passwordInvalid(): boolean {
    const control = this.loginForm.get('password');
    return !!(control?.invalid && control?.touched);
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    const { email, password } = this.loginForm.value;

    signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.router.navigate(['/home']);
        this.loading = false;
      })
      .catch((err) => {
        this.serverError = err.message;
        this.loading = false;
      });
  }

  async loginWithGoogle(): Promise<void> {
    try {
      this.loading = true;
      await signInWithPopup(this.auth, new GoogleAuthProvider());
      this.router.navigate(['/home']);
    } catch (err: any) {
      this.serverError = err.message;
      this.loading = false;
    }
  }

  loginWithGithub(): void {
    console.log('Login con GitHub - En desarrollo');
  }
}

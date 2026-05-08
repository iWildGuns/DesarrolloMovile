import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from '@angular/fire/auth';

// import { AuthService } from '../services/auth.service'; // descomentá cuando tengas tu servicio

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [ReactiveFormsModule],
})
export class LoginPage {
  loginForm: FormGroup;
  showPassword = false;
  loading = false;
  serverError = '';

  constructor(
    private auth: Auth,
    private fb: FormBuilder,
    private router: Router,
    // private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
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

  onSubmit(): void {
    const { email, password } = this.loginForm.value;
    signInWithEmailAndPassword(this.auth, email, password)
      .then(() => this.router.navigate(['/home']))
      .catch((err) => (this.serverError = err.message));
  }

  async loginWithGoogle(): Promise<void> {
    try {
      await signInWithPopup(this.auth, new GoogleAuthProvider());
      this.router.navigate(['/home']);
    } catch (err: any) {
      this.serverError = err.message;
    }
  }

  loginWithGithub(): void {
    // this.authService.loginWithGithub();
    console.log('Login con GitHub');
  }
}

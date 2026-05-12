import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonButton,
  IonText,
  IonIcon,
} from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { SignUpForm } from 'src/types';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonText,
    IonButton,
    IonInput,
    IonItem,
    IonContent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class SignUpPage implements OnInit {
  hide = true;

  formBuilder = inject(NonNullableFormBuilder);

  constructor(private router: Router) {}

  form: FormGroup = this.formBuilder.group<SignUpForm>({
    name: this.formBuilder.control('', {
      validators: Validators.required,
    }),
    lastName: this.formBuilder.control('', {
      validators: Validators.required,
    }),
    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
    }),
    password: this.formBuilder.control('', {
      validators: Validators.required,
    }),
  });

  forgotPassword() {}
  login() {}
  loginWithGoogle() {}
  goToSignIn() {
    this.router.navigate(['/sign-in']);
  }

  signUp(): void {
    if (this.form.invalid) return;
    console.log(this.form.value);
  }

  ngOnInit() {}
}

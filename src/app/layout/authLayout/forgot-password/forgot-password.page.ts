import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import {
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonButton,
  IonText,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonButton,
    IonItem,
    IonInput,
    IonIcon,
    IonContent,
    CommonModule,
    FormsModule,
  ],
})
export class ForgotPasswordPage implements OnInit {
  hide = true;
  password = '12345';

  form = FormGroup;
  constructor(private router: Router) {}

  goToSignIn() {
    this.router.navigate(['/sign-in']);
  }
  login() {}

  ngOnInit() {}
}

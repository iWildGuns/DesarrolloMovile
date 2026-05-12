import { Component, Input, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton],
})
export class HeaderComponent implements OnInit {
  @Input() menuId: string = 'main-menu';
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['home']);
  }

  ngOnInit() {}
}

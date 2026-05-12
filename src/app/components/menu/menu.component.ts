import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonRouterOutlet,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonItem,
  IonMenu,
  IonList,
  IonLabel,
  MenuController,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [
    IonItem,
    IonToolbar,
    IonHeader,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonContent,
    IonMenu,
    IonList,
    IonLabel,
  ],
})
export class MenuComponent implements OnInit {
  @Input() contentId: string = 'main-content';
  @Input() menuId: string = 'main-menu';

  constructor(
    private router: Router,
    public menu: MenuController,
  ) {}

  direccionarACurrency() {
    this.router.navigate(['/all-currency-view']);
    this.menu.close('main-menu');
  }

  loginRoute() {
    this.router.navigate(['login']);
    this.menu.close('main-menu');
    console.log('loginROuter');
  }

  ngOnInit() {}
}

import { Component } from '@angular/core';
import {
  // IonHeader,
  // IonToolbar,
  // IonTitle,
  // IonContent,
  // IonMenu,
  // IonList,
  // IonItem,
  // IonLabel,
  // IonButtons,
  // IonMenuButton,
  // IonText,
  // IonSelectOption,
  // IonSelect,
  IonRouterOutlet,
  IonContent,
} from '@ionic/angular/standalone';
import { HttpClientService } from '../../service/http-client';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { IDivisa, IResults } from 'src/types';
import { MenuComponent } from 'src/app/components/menu/menu.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, HeaderComponent, IonRouterOutlet, MenuComponent],
})
export class HomePage {
  constructor(
    public proveedorService: HttpClientService,
    private router: Router,
  ) {}

  mostrar: boolean = false;
  public divisas: IResults[] = [];
  public currencyByDate: IDivisa[] = [];

  ngOnInit(): void {}
}

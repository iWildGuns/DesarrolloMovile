import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenu,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonMenuButton,
  IonText,
  IonSelectOption,
  IonSelect,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { HttpClientService } from '../../service/http-client';
import { Router } from '@angular/router';
import { ICurrencyByDate, IResults } from 'src/types/results';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonSelect,
    IonText,
    IonButtons,
    IonLabel,
    IonItem,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonMenu,
    IonMenuButton,
    IonSelectOption,
    IonRouterOutlet,
  ],
})
export class HomePage {
  constructor(
    public proveedorService: HttpClientService,
    private router: Router,
  ) {}

  mostrar: boolean = false;
  public divisas: IResults[] = [];
  public currencyByDate: ICurrencyByDate[] = [];

  loginRoute() {
    this.router.navigate(['/login']);
    console.log('loginROuter');
  }

  direccionarACurrency() {
    this.router.navigate(['/currency']);
  }

  getData() {
    this.proveedorService.getDivisa().subscribe({
      next: (data: any) => {
        this.divisas = data.results;
        this.divisas.forEach((divisa, index) => {
          divisa.id = index++;
        });
        console.log(this.divisas);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  /*
  getCurrencyByDate() {
    this.proveedorService.getCurrencyByDate().subscribe({
      next: (data: any) => {
        this.currencyByDate = data.results.detalle;
        this.currencyByDate.forEach((divisa, index) => {
          divisa.id = index++;
        });
        console.log(this.currencyByDate);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
    */

  ngOnInit() {
    // this.getData();
    // this.getCurrencyByDate();
  }
}

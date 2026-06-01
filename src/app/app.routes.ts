import { Routes } from '@angular/router';
import { HomePage } from './view/home/home.page';
import { LoginPage } from './layout/login/login.page';
import { LayoutComponent } from './layout/appLayout/layout.component';
import { AllCurrencyViewPage } from './view/all-currency-view/all-currency-view.page';
import { CurrencyPage } from './view/currency/currency.page';
import { CurrenciesBetweenDatesPage } from './view/currencies-between-dates/currencies-between-dates.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomePage },
      { path: 'currency', component: CurrencyPage },
      {
        path: 'all-currency-view',
        component: AllCurrencyViewPage,
      },
      {
        path: 'currencies-between-dates',
        component: CurrenciesBetweenDatesPage,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

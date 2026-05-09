import { Routes } from '@angular/router';
import { AllCurrencyViewPage } from './view/all-currency-view/all-currency-view.page';
import { HomePage } from './layout/home/home.page';
import { LoginPage } from './layout/login/login.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'all-currency-view',
        component: AllCurrencyViewPage,
      },
    ],
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'all-currency-view',
    loadComponent: () =>
      import('./view/all-currency-view/all-currency-view.page').then(
        (m) => m.AllCurrencyViewPage,
      ),
  },
];

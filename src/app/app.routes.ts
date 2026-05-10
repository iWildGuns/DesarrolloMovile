import { Routes } from '@angular/router';
import { AllCurrencyViewPage } from './view/all-currency-view/all-currency-view.page';
import { HomePage } from './layout/home/home.page';
import { LoginPage } from './layout/login/login.page';
import { CurrencyPage } from './currency/currency.page';

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
  {
    path: 'currency',
    loadComponent: () => import('./currency/currency.page').then( m => m.CurrencyPage)
  },

];

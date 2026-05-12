import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./layout/login/sign-in/sign-in.page').then((m) => m.SignInPage),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./layout/login/sign-up/sign-up.page').then((m) => m.SignUpPage),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../app/view/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'currency',
        loadComponent: () =>
          import('../app/view/currency/currency.page').then(
            (m) => m.CurrencyPage,
          ),
      },
      {
        path: 'all-currency-view',
        loadComponent: () =>
          import('../app/view/all-currency-view/all-currency-view.page').then(
            (m) => m.AllCurrencyViewPage,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/main',
  },
];

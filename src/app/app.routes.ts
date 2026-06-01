import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () =>
      import('../app/layout/appLayout/layout.component').then(
        (m) => m.LayoutComponent,
      ),
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
    redirectTo: '/home',
  },
];

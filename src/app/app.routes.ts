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
      {
        path: 'app-currencies-between-dates',
        loadComponent: () =>
          import('../app/view/currencies-between-dates/currencies-between-dates.page').then(
            (m) => m.CurrenciesBetweenDatesPage,
          ),
      },
      {
        path: 'currency-converter',
        loadComponent: () =>
          import('./view/currency-converter/currency-converter.page').then(
            (m) => m.CurrencyConverterPage,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

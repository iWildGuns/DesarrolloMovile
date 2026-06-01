import { Routes } from '@angular/router';
import { HomePage } from './view/home/home.page';
import { LayoutComponent } from './layout/appLayout/layout.component';
import { AllCurrencyViewPage } from './view/all-currency-view/all-currency-view.page';
import { CurrencyPage } from './view/currency/currency.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
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
    ],
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

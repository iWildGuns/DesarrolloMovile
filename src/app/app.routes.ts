import { Routes } from '@angular/router';
import { AllCurrencyViewPage } from './view/all-currency-view/all-currency-view.page';
import { HomePage } from './view/home/home.page';
import { LoginPage } from './layout/login/login.page';
import { LayoutComponent } from './layout/layout/layout.component';

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
      {
        path: 'all-currency-view',
        component: AllCurrencyViewPage,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/main',
  },
];

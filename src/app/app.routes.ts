import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./layout/authLayout/sign-in/sign-in.page').then(
        (m) => m.SignInPage,
      ),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./layout/authLayout/forgot-password/forgot-password.page').then(
        (m) => m.ForgotPasswordPage,
      ),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./layout/authLayout/sign-up/sign-up.page').then(
        (m) => m.SignUpPage,
      ),
  },
  {
    path: 'confirm-email',
    loadComponent: () =>
      import('./layout/authLayout/confirm-email/confirm-email.page').then(
        (m) => m.ConfirmEmailPage,
      ),
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
  {
    path: 'confirm-email',
    loadComponent: () =>
      import('./layout/authLayout/confirm-email/confirm-email.page').then(
        (m) => m.ConfirmEmailPage,
      ),
  },
];

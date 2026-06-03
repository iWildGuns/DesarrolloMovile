import { ApplicationConfig } from '@angular/core';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { authConfig } from './auth/auth.config';
import { provideAuth as provideAuth_alias } from 'angular-auth-oidc-client';
import { environment } from 'src/environments/environment';

const firebaseConfig = {
  apiKey: 'AIzaSyAj9G9OFb1lNUhxW2GJnHs-oE5yPnxWhjE',
  authDomain: 'movileproject-e2ee6.firebaseapp.com',
  projectId: 'movileproject-e2ee6',
  storageBucket: 'movileproject-e2ee6.firebasestorage.app',
  messagingSenderId: '420797392681',
  appId: '1:420797392681:web:4b541772537d80c75ab938',
  measurementId: 'G-Q91J92K4BP',
};

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideAuth_alias(authConfig),
  ],
};

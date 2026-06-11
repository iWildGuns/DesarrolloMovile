import { bootstrapApplication } from '@angular/platform-browser';
import { Amplify } from 'aws-amplify';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { awsconfigYiyi } from './aws-exports';

Amplify.configure(awsconfigYiyi);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);

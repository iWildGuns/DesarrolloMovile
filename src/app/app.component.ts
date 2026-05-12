import { Component } from '@angular/core';
// import { ReactiveFormsModule } from '@angular/forms';
import { IonApp, IonRouterOutlet, IonContent } from '@ionic/angular/standalone';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, MenuComponent, IonContent],
})
export class AppComponent {
  constructor() {}
}

import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [IonRouterOutlet, IonContent, HeaderComponent],
})
export class LayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

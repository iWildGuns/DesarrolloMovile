import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { IResults } from 'src/types/results';

@Component({
  selector: 'app-all-currency-view',
  templateUrl: './all-currency-view.page.html',
  styleUrls: ['./all-currency-view.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class AllCurrencyViewPage implements OnInit {
  // currency: Observable<IResults | null>[];

  constructor() {}

  ngOnInit() {}
}

import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Página de Inicio
 * Página principal de la aplicación
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss', '../../app.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage {
  mostrar: boolean = false;

  constructor() {}
}

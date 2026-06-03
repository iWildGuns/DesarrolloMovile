import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientService } from 'src/app/service/http-client';
import { IDivisas, IResults } from 'src/types';
import { addIcons } from 'ionicons';
import { logoWhatsapp } from 'ionicons/icons';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.page.html',
  styleUrls: ['./currency-converter.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class CurrencyConverterPage implements OnInit {
  moneda: string = '';

  importe: number = 0;
  resultado: number = 0;
  divisas: IResults[] = [];
  fechaCotizacion: string = '';
  cotizacionActual: number = 0;

  //buscador de monedas
  monedas?: IDivisas;
  monedasFiltradas: IResults[] = [];
  textoBuscado = '';
  monedaSeleccionada?: IResults;

  constructor(public httpClientService: HttpClientService) {
    addIcons({ logoWhatsapp });
  }

  ngOnInit() {
    this.cargarDivisas();
  }
  cargarDivisas(): void {
    this.httpClientService.getDivisa().subscribe({
      next: (res: IDivisas) => {
        this.monedas = res;
        this.divisas = res.results;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  filtrarMonedas(event: any) {
    const texto = event.target.value?.toLowerCase().trim() || '';
    if (!texto) {
      this.monedasFiltradas = [];
      return;
    }
    this.monedasFiltradas = this.divisas?.filter(
      (m) =>
        m.denominacion?.toLowerCase().includes(texto) ||
        m.codigo?.toLocaleLowerCase().includes(texto),
    );
  }
  seleccionarMoneda(moneda: IResults) {
    this.monedaSeleccionada = moneda; //iresult

    this.textoBuscado = `${moneda.codigo} - ${moneda.denominacion}`;
    if (moneda.codigo) {
      this.moneda = moneda.codigo;
      console.log(this.moneda);
    }
    this.monedasFiltradas = [];
  }
  convertir(): void {
    this.httpClientService.getLastCurrencyQuote(this.moneda).subscribe({
      next: (res) => {
        const ultimaCotizacion = res.results[0];

        this.cotizacionActual = ultimaCotizacion.detalle[0].tipoCotizacion;
        this.fechaCotizacion = ultimaCotizacion.fecha;
        this.resultado = this.importe * this.cotizacionActual;
      },
    });
  }
  formatearFecha(fecha: Date): string {
    const anio = fecha.getFullYear();

    const mes = String(fecha.getMonth() + 1).padStart(2, '0');

    const dia = String(fecha.getDate()).padStart(2, '0');

    return `${anio}-${mes}-${dia}`;
  }

  shareOnWhatsApp() {
    if (this.resultado === 0 || !this.importe || !this.monedaSeleccionada) {
      return;
    }

    const mensaje =
      ` *Conversor de Divisas*\n` +
      `Monto base: ${this.importe}\n` +
      `Moneda seleccionada: ${this.monedaSeleccionada.codigo} - ${this.monedaSeleccionada.denominacion}\n` +
      `Resultado: ${this.resultado.toFixed(2)} ARS\n` +
      `Tasa de cambio: 1 ${this.monedaSeleccionada.codigo} = ${this.cotizacionActual} ARS\n` +
      `Fecha cotización: ${this.fechaCotizacion}`;

    const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }
}

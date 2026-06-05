import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoWhatsapp } from 'ionicons/icons';
import { HttpClientService } from 'src/app/service/http-client';
import { IDivisas, IResults } from 'src/types';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.page.html',
  styleUrls: ['./currency-converter.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonCardTitle,
    IonCardContent,
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonLabel,
    IonSearchbar,
    IonList,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
  ],
})
export class CurrencyConverterPage implements OnInit {
  moneda: string = '';

  importe: number = 0;
  resultado: number = 0;
  divisas: IResults[] = [];
  fechaCotizacion: string = '';
  cotizacionActual: number = 0;

  monedas?: IDivisas;
  monedasFiltradas: IResults[] = [];
  textoBuscado = '';
  monedaSeleccionada?: IResults;

  /**
   * Constructor: Inyecta el servicio HTTP personalizado para llamadas a la API.
   * Registra el ícono de WhatsApp para poder usarlo en la vista.
   */
  constructor(public httpClientService: HttpClientService) {
    addIcons({ logoWhatsapp });
  }

  /**
   * ngOnInit: Se ejecuta al inicializar el componente.
   * Carga la lista de todas las divisas disponibles al arrancar la página.
   */

  ngOnInit() {
    this.cargarDivisas();
  }

  /**
   * cargarDivisas: Obtiene todas las divisas desde el servicio HTTP.
   * Asigna el resultado a 'monedas' y extrae el array 'results' a 'divisas'.
   * En caso de error, lo imprime en consola.
   */
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

  /**
   * filtrarMonedas: Filtra la lista de divisas según el texto ingresado en un campo de búsqueda.
   * @param event - Evento del input (contiene el valor buscado).
   *
   * Lógica:
   * - Si no hay texto, limpia la lista filtrada.
   * - Si hay texto, busca coincidencias (case-insensitive) en 'denominacion' o 'codigo'
   *   y guarda los resultados en 'monedasFiltradas' para mostrarlos en un dropdown.
   */
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

  /**
   * @function seleccionarMoneda: Maneja la selección de una moneda desde la lista filtrada.
   * @param moneda - Objeto IResults (contiene código, denominación, fecha, detalle).
   *
   * Acciones:
   * - Guarda la moneda seleccionada en 'monedaSeleccionada'.
   * - Muestra en el input de búsqueda el formato "código - denominación".
   * - Asigna el código de moneda a 'moneda' (para usarlo en la conversión).
   * - Limpia la lista filtrada para cerrar el dropdown.
   */

  seleccionarMoneda(moneda: IResults) {
    this.monedaSeleccionada = moneda;

    this.textoBuscado = `${moneda.codigo} - ${moneda.denominacion}`;
    if (moneda.codigo) {
      this.moneda = moneda.codigo;
      console.log(this.moneda);
    }
    this.monedasFiltradas = [];
  }

  /**
   * @function convertir: Realiza la conversión de moneda usando la última cotización disponible.
   *
   *
   * Flujo:
   * 1. Llama al servicio para obtener la última cotización de la moneda seleccionada.
   * 2. Extrae el primer resultado (se asume que es el más reciente).
   * 3. Obtiene 'tipoCotizacion' como tasa de cambio.
   * 4. Guarda la fecha de la cotización.
   * 5. Calcula: resultado = importe * cotización actual.
   * @returns void
   */
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

  /**
   * formatearFecha: Convierte un objeto Date a string en formato YYYY-MM-DD.
   * @param fecha - Fecha a formatear.
   * @returns String con formato 'aaaa-mm-dd' (ej. '2025-03-27').
   *
   * Nota: Se usa padStart(2,'0') para mantener dos dígitos en mes y día.
   */
  formatearFecha(fecha: Date): string {
    const anio = fecha.getFullYear();

    const mes = String(fecha.getMonth() + 1).padStart(2, '0');

    const dia = String(fecha.getDate()).padStart(2, '0');

    return `${anio}-${mes}-${dia}`;
  }

  /**
   * shareOnWhatsApp: Comparte el resultado de la conversión por WhatsApp.
   *
   * Validaciones:
   * - Si no hay resultado, importe o moneda seleccionada, no hace nada.
   *
   * Construye un mensaje con:
   * - Monto base
   * - Moneda seleccionada (código + denominación)
   * - Resultado convertido a ARS
   * - Tasa de cambio usada
   * - Fecha de la cotización
   *
   * Luego abre WhatsApp Web (o la app en móvil) con el mensaje preescrito.
   */

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

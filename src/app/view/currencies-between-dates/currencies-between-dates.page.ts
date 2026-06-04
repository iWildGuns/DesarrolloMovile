import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSearchbar,
  IonList,
  IonItem,
  IonInput,
  IonPopover,
  IonDatetime,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientService } from 'src/app/service/http-client';
import { Chart } from 'chart.js/auto';
import { IDivisa, IDivisas } from 'src/types';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { addIcons } from 'ionicons';
import { shareSocialOutline } from 'ionicons/icons';
import { CurrencySymbolPipe } from 'src/app/shared/pipes/currency-symbol-pipe';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-currencies-between-dates',
  templateUrl: './currencies-between-dates.page.html',
  styleUrls: ['./currencies-between-dates.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CurrencySymbolPipe,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonSearchbar,
    IonList,
    IonItem,
    IonInput,
    IonPopover,
    IonDatetime,
    IonButton,
    IonIcon,
  ],
})
export class CurrenciesBetweenDatesPage implements OnInit {
  divisas: IDivisa[] = [];
  filteredDivisas: IDivisa[] = [];
  divisaSeleccionada: IDivisa | null = null;

  vistaSeleccionada: string = 'lista';
  chart: any;
  searchTerm: string = '';
  showResults: boolean = false;
  moneda: string = 'USD';

  fechaActual: string = new Date().toISOString().split('T')[0];
  fechaDesde: string = '';
  fechaHasta: string = '';
  data: any;
  disable: boolean = true;
  isLoading: boolean = false;
  errorMessage: string = '';

  private destroy$ = new Subject<void>();

  constructor(private httpClientService: HttpClientService) {
    addIcons({ shareSocialOutline });
  }

  ngOnInit() {
    const anterior = new Date();
    const hoy = new Date();
    anterior.setDate(hoy.getDate() - 7);
    this.fechaDesde = anterior.toISOString().split('T')[0];
    this.fechaHasta = hoy.toISOString().split('T')[0];

    this.httpClientService
      .getCurrenciesBetweenDate(this.moneda, this.fechaDesde, this.fechaHasta)
      .subscribe({
        next: (res) => {
          this.data = res;
          this.cargarDivisas();
        },
        error: (err) => console.error('ERROR:', err),
      });
  }

  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    return utcDay !== 0 && utcDay !== 6;
  };

  validarFechas() {
    if (
      this.fechaDesde &&
      this.fechaHasta &&
      this.fechaDesde > this.fechaHasta
    ) {
      this.fechaHasta = this.fechaDesde;
    }
    if (this.fechaHasta && this.fechaHasta > this.fechaActual) {
      this.fechaHasta = this.fechaActual;
    }
  }

  buscarCotizaciones(): void {
    this.isLoading = true;
    this.httpClientService
      .getCurrenciesBetweenDate(this.moneda, this.fechaDesde, this.fechaHasta)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resp) => this.handleCotizacionesResponse(resp),
        error: () => this.handleError('Error al obtener las cotizaciones'),
      });
  }

  private handleCotizacionesResponse(resp: any): void {
    this.data = resp;
    this.disable = false;
    this.isLoading = false;
    this.errorMessage = '';

    if (this.vistaSeleccionada === 'grafico') {
      this.crearGrafico();
    }
  }

  // Se ejecuta cada vez que el usuario cambia entre las pestañas Listado y Gráfico
  segmentChanged() {
    if (this.vistaSeleccionada === 'grafico' && this.data) {
      // Un mini timeout de 50ms le da tiempo al DOM de remover el [hidden]
      // antes de que Chart.js calcule los tamaños del lienzo
      setTimeout(() => {
        this.crearGrafico();
      }, 50);
    }
  }

  crearGrafico() {
    if (this.chart) {
      this.chart.destroy();
    }

    const canvas = document.getElementById('miGrafico') as HTMLCanvasElement;
    if (!canvas) return; // Control de seguridad por si el elemento no está en el DOM

    this.chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: this.data.results.map((x: any) => x.fecha).reverse(),
        datasets: [
          {
            label: this.moneda,
            data: this.data.results.map(
              (x: any) => x.detalle[0].tipoCotizacion,
            ),
            tension: 0.3,
            borderColor: '#3880ff', // Un color azul nativo de Ionic para que quede más lindo
            backgroundColor: 'rgba(56, 128, 255, 0.1)',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Permite que se adapte mejor a las pantallas de celulares
        plugins: {
          title: {
            display: true,
            text:
              this.data.results[0]?.detalle[0]?.descripcion ||
              'Evolución de Cotización',
          },
        },
      },
    });
  }

  private cargarDivisas(): void {
    this.httpClientService
      .getDivisa()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resp) => this.handleDivisasResponse(resp),
        error: () => this.handleError('Error al cargar las divisas'),
      });
  }

  private handleDivisasResponse(res: IDivisas): void {
    this.divisas = res.results.map(
      (item: any): IDivisa => ({
        id: item.id,
        codigoMoneda: item.codigo,
        descripcion: item.denominacion,
        tipoPase: item.tipoPase,
        tipoCotizacion: item.tipoCotizacion,
      }),
    );
  }

  private handleError(message: string): void {
    this.errorMessage = message;
    this.isLoading = false;
  }

  filterCurrencies(event: any) {
    const value = event.detail.value || '';

    console.log(this.divisas);

    if (!value.trim()) {
      this.filteredDivisas = [];
      this.showResults = false;
      return;
    }

    this.filteredDivisas = this.httpClientService.filterCurrencies(
      this.divisas,
      value,
    );
    this.showResults = true;
    console.log(this.filteredDivisas);
  }

  seleccionarDivisa(divisa: IDivisa) {
    this.divisaSeleccionada = divisa;
    this.moneda = this.divisaSeleccionada.codigoMoneda;
    this.filteredDivisas = [];
    this.showResults = false;
    this.searchTerm = `${divisa.codigoMoneda} - ${divisa.descripcion}`;
  }

  async descargarGraficoNativo() {
    const canvas = document.getElementById('miGrafico') as HTMLCanvasElement;
    if (!canvas) return;

    const imageURL = canvas.toDataURL('image/png');
    const base64Data = imageURL.split(',')[1];
    const nombreArchivo = `cotizApp_${new Date().getTime()}.png`;

    try {
      if (Capacitor.getPlatform() === 'android') {
        await Filesystem.requestPermissions();
      }
      await Filesystem.writeFile({
        path: `Pictures/${nombreArchivo}`,
        data: base64Data,
        directory: Directory.ExternalStorage,
      });

      alert('Gráfico guardado en Imágenes');
    } catch (error) {
      console.error('Error al guardar', error);
      const resultado = await Filesystem.writeFile({
        path: nombreArchivo,
        data: base64Data,
        directory: Directory.Cache,
      });
      await Share.share({
        title: 'Gráfico CotizApp',
        url: resultado.uri,
      });
    }
  }
}

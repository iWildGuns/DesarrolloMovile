import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientService } from 'src/app/service/http-client';
import { Chart } from 'chart.js/auto';
import { IDivisa, IDivisas } from 'src/types';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { addIcons } from 'ionicons';
import { shareSocialOutline } from 'ionicons/icons';

@Component({
  selector: 'app-currencies-between-dates',
  templateUrl: './currencies-between-dates.page.html',
  styleUrls: ['./currencies-between-dates.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
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

  constructor(private httpClientService: HttpClientService) {
    addIcons({ shareSocialOutline });
  }

  ngOnInit() {
    const hoy = new Date();
    const anterior = new Date();
    anterior.setDate(hoy.getDate() - 7);
    this.fechaHasta = hoy.toISOString().split('T')[0];
    this.fechaDesde = anterior.toISOString().split('T')[0];

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

  buscarCotizaciones() {
    this.httpClientService
      .getCurrenciesBetweenDate(this.moneda, this.fechaDesde, this.fechaHasta)
      .subscribe({
        next: (res) => {
          this.data = res;
          this.disable = false;

          // Si el usuario ya está parado en la pestaña del gráfico, lo dibujamos inmediatamente
          if (this.vistaSeleccionada === 'grafico') {
            this.crearGrafico();
          }
        },
        error: (err) => console.error(err),
      });
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

  cargarDivisas() {
    this.httpClientService.getDivisa().subscribe({
      next: (res: IDivisas) => {
        this.divisas = res.results.map(
          (item: any): IDivisa => ({
            id: item.id,
            codigoMoneda: item.codigo,
            descripcion: item.denominacion,
            tipoPase: item.tipoPase,
            tipoCotizacion: item.tipoCotizacion,
          }),
        );
      },
      error: (err) => console.error(err),
    });
  }

  // REFACTORIZADO: Ahora utiliza tu función compartida del servicio
  filterCurrencies(event: any) {
    const value = event.detail.value || '';

    if (!value.trim()) {
      this.filteredDivisas = [];
      this.showResults = false;
      return;
    }

    // Invocamos el filtro inteligente centralizado
    this.filteredDivisas = this.httpClientService.filterCurrencies(
      this.divisas,
      value,
    );
    this.showResults = true;
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
    const nombreArchivo = `mi_grafico_${new Date().getTime()}.png`;

    try {
      const resultado = await Filesystem.writeFile({
        path: nombreArchivo,
        data: base64Data,
        directory: Directory.Cache,
      });

      await Share.share({
        title: 'Mi Gráfico',
        text: 'Aquí tienes los resultados del gráfico de CotizApp.',
        url: resultado.uri,
        dialogTitle: 'Guardar o Compartir Gráfico',
      });
    } catch (error) {
      console.error('Error al guardar o compartir el gráfico', error);
    }
  }
}

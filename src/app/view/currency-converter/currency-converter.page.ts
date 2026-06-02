import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ICotizaciones, IDivisa, IDivisas, IResults, IResultsResponse } from 'src/types';
import { HttpClientService } from 'src/app/service/http-client';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.page.html',
  styleUrls: ['./currency-converter.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule,IonicModule]
})
export class CurrencyConverterPage implements OnInit {
  moneda: string='';
  
  importe: number=0;
  resultado:number=0;
  divisas:IResults[]=[];
  fechaCotizacion: string = '';
  cotizacionActual: number = 0;

  //buscador de monedas
  monedas?:IDivisas;
  monedasFiltradas:IResults[]=[];
  textoBuscado='';
  monedaSeleccionada?:IResults;
 
  constructor(public httpClientService:HttpClientService) { }
 
  ngOnInit() {
    this.cargarDivisas();
  }
  cargarDivisas(): void {


  this.httpClientService.getDivisa()
    .subscribe({
      next: (res: IDivisas) => {
        this.monedas=res;
        this.divisas = res.results;
      },
      error: (err) => {
        console.error(err);
      }
    });
}
filtrarMonedas(event:any){
  const texto=event.target.value?.toLowerCase().trim()||'';
  if(!texto){
    this.monedasFiltradas=[];
    return;
  }
  this.monedasFiltradas=this.divisas?.filter(m=>m.denominacion?.toLowerCase().includes(texto)||
  m.codigo?.toLocaleLowerCase().includes(texto));
}
seleccionarMoneda(moneda: IResults) {

    this.monedaSeleccionada = moneda;//iresult

    this.textoBuscado =
      `${moneda.codigo} - ${moneda.denominacion}`;
      if (moneda.codigo) {
        this.moneda = moneda.codigo;
        console.log(this.moneda);
        }
    this.monedasFiltradas = [];
  }
convertir(): void {


  this.httpClientService
    .getLastCurrencyQuote(this.moneda)
    .subscribe({


      next: (res) => {
        console.log(JSON.stringify(res, null, 2));
        const ultimaCotizacion =
          res.results[0];
         
        this.cotizacionActual =
          ultimaCotizacion.detalle[0].tipoCotizacion;
          console.log(this.cotizacionActual)
        this.fechaCotizacion =
          ultimaCotizacion.fecha;
        this.resultado =
          this.importe * this.cotizacionActual;


      }


    });


}
formatearFecha(fecha: Date): string {


  const anio = fecha.getFullYear();


  const mes = String(fecha.getMonth() + 1)
    .padStart(2, '0');


  const dia = String(fecha.getDate())
    .padStart(2, '0');


  return `${anio}-${mes}-${dia}`;


}
}

// Tipos de Divisas
export type IDivisa = {
  id?: number;
  codigoMoneda: string;
  descripcion: string;
  tipoPase: number;
  tipoCotizacion: number;
};

export type IResults = {
  id?: number;
  codigo?: string;
  denominacion?: string;
  fecha: string;
  detalle: IDivisa[];
};

export type IDivisas = {
  status: number;
  results: IResults[];
};

export type IFavoriteCurrency = {
  codigo: string;
  denominacion: string;
  posicion: number;
};

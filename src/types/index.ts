/**
 * Tipos principales de la aplicación
 */

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
};

export type IResultsResponse = {
  fecha: string;
  detalle: IDivisa[];
};

// Tipos de Respuestas API
export type IDivisas = {
  status: number;
  results: IResults[];
};

export type ICotizaciones = {
  status: number;
  results: ICurrencyByDate[];
};

export type ICurrencyByDate = {
  id: number;
  fecha: string;
  detalle: IDetalle[];
};

export type IDetalle = {
  codigoMoneda: string;
  descripcion: string;
  tipoPase: number;
  tipoCotizacion: number;
};

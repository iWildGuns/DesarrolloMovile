export type IDivisas = {
  status: number;
  results: IResults[];
};

export type IResults = {
  id: number;
  codigo: string;
  denominacion: string;
};

// export type IUser = {
//   name: string;
//   username: string;
// };

export type ICotizaciones = {
  status: number;
  results: ICurrencyByDate;
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
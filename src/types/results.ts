export type IResults = {
  id: number;
  codigo: string;
  denominacion: string;
};

// export type IUser = {
//   name: string;
//   username: string;
// };

export type ICurrencyByDate = {
  id: number;
  fecha: string;
  detalle: {
    codigoMoneda: string;
    descripcion: string;
    tipoPase: number;
    tipoCotizacion: number;
  };
};

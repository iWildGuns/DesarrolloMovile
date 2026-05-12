// export type IResults = {
//   id: number;
//   codigo: string;
//   denominacion: string;
// };

// export type IUser = {
//   name: string;
//   username: string;
// };

export type IDivisa = {
  id?: number;
  codigoMoneda: string;
  descripcion: string;
  tipoPase: number;
  tipoCotizacion: number;
};

export type IResults = {
  fecha: string;
  detalle: IDivisa[];
};

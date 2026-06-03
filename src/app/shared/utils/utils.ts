import { IDivisa } from 'src/types';

export function aplicarFiltro(
  divisas: IDivisa[] | undefined,
  event: any,
): IDivisa[] | undefined {
  const value = event.target.value.trim().toLowerCase();
  let divisasFiltradas = divisas?.filter(
    (divisa) =>
      divisa.codigoMoneda?.trim().toLowerCase().includes(value) ||
      divisa.descripcion?.trim().toLowerCase().includes(value),
  );
  return divisasFiltradas;
}

/**
 * Obtiene la fecha local en formato ISO
 */
export function getLocalDate(): string {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60000);
  return localDate.toISOString();
}

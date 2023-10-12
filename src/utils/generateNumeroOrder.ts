export function generarNumeroOrden() {
  const fecha = new Date();
  const componenteFechaHora = fecha.getFullYear().toString() + (fecha.getMonth() + 1).toString().padStart(2, '0') + fecha.getDate().toString().padStart(2, '0') + fecha.getHours().toString().padStart(2, '0') + fecha.getMinutes().toString().padStart(2, '0') + fecha.getSeconds().toString().padStart(2, '0') + fecha.getMilliseconds().toString().padStart(3, '0');
  const componenteAleatorio = Math.random().toString(36).substring(2, 15);
  const numeroOrden = componenteFechaHora + componenteAleatorio;
  return numeroOrden.substring(0, 26);
}
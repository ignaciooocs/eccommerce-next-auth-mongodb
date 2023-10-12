export function dateFormat(date: string) {
  const fecha = new Date(date)
  const opciones: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' } 
  const formatoFecha = new Intl.DateTimeFormat('es-ES', opciones)
  const fechaFormateada = formatoFecha.format(fecha)
  return fechaFormateada
}

export const formatoNumero = new Intl.NumberFormat('es-ES')

type TipoDePago =
  | 'VN' 
  | 'S2' 
  | 'SI'
  | 'NC' 
  | 'VC'
  | 'VD' 
  | 'VP'

export function typePayment(codePayment: TipoDePago) {
  const types = {
    'VN': 'Crédito',
    'S2': 'Crédito',
    'SI': 'Crédito',
    'NC': 'Crédito',
    'VC': 'Crédito',
    'VD': 'Débito',
    'VP': 'Débito'
  }
  return types[codePayment] || 'Tipo de pago no válido'
}

export function typeQuota(codePayment: TipoDePago) {
  const types = {
    VD: 'Venta Débito',
    VN: 'Venta Normal',
    VC: 'Venta en cuotas',
    SI: '3 cuotas sin interés',
    S2: '2 cuotas sin interés',
    NC: 'N Cuotas sin interés',
    VP: 'Venta Prepago',
  }
  return types[codePayment] || 'Tipo de pago no válido'
}

;
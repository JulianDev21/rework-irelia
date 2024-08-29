
const HORA_TARIFA = 5000; 

// Método para calcular el valor a pagar
export function calcularValorAPagar(hours) {
    if (hours < 1) {
        return HORA_TARIFA; 
    }
    return Math.floor(hours) * HORA_TARIFA;
}
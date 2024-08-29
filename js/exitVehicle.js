import Celda from '../models/celda.js';
import { calcularValorAPagar } from '../js/calcularValorAPagar.js';


// Método para salir de un vehículo
export async function exitVehicle(req, res) {
    let msg = 'Vehicle exit successfully';
    const { plateVehicle } = req.body; 
    let valorAPagar = 0;

    try {
        // Buscar la celda con la placa del vehículo
        const exitCelda = await Celda.findOne({ plateVehicle: plateVehicle });

        if (!exitCelda) {
            msg = 'Error when leaving the vehicle';
            return res.status(404).json({ msg });
        }

        // Calcular las horas transcurridas entre entryDate y departureDate
        const entryDate = exitCelda.entryDate;
        const departureDate = new Date();
        const timeDifference = departureDate - entryDate; // Diferencia en milisegundos

        // Convertir milisegundos a horas
        const hours = timeDifference / (1000 * 60 * 60);

        // Calcular el valor a pagar usando la función calcularValorAPagar
        valorAPagar = calcularValorAPagar(hours);

        // Actualizar los campos de la celda
        exitCelda.plateVehicle = null;
        exitCelda.status = 'disponible';
        exitCelda.entryDate = null;
        exitCelda.departureDate = null;

        // Re-Asignar el PIN a null
        exitCelda.pin = null;

        await exitCelda.save();

    } catch (error) {
        console.error('Error exit vehicle:', error);
        msg = error.message;
        return res.status(500).json({ msg });
    }

    res.json({ msg: 'El valor a pagar es: ', valorAPagar });
}

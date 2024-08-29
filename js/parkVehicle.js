import Celda from '../models/celda.js';
import bcrypt from 'bcryptjs';

// Método para parquear un vehículo
export async function parkVehicle(req, res) {
    let msg = 'Vehicle parked successfully';
    const { plateVehicle } = req.body; 

    try {
        // Buscar una celda disponible
        const availableCelda = await Celda.findOne({ status: 'disponible' });

        if (!availableCelda) {
            msg = 'No available parking spaces';
            return res.status(404).json({ msg });
        }

        // Asignar la placa del vehículo, cambiar el estado y asignar la fecha de entrada actual
        availableCelda.plateVehicle = plateVehicle;
        availableCelda.status = 'no disponible';
        availableCelda.entryDate = new Date(); // Asigna la fecha y hora actual
        availableCelda.departureDate = null;

        // Concatenar numbercell y plateVehicle para crear el PIN
        const concatenatedString = `${availableCelda.numbercell}${plateVehicle}`;
        const hashedPin = bcrypt.hashSync(concatenatedString, 10);

        // Asignar el PIN hasheado
        availableCelda.pin = hashedPin;

        await availableCelda.save();

    } catch (error) {
        console.error('Error parking vehicle:', error); // Registrar el error en consola
        msg = error.message;
        return res.status(500).json({ msg });
    }

    res.json({ msg });
}

import mongoose, { model, Schema } from 'mongoose';


// Define el esquema para una celda
const celdaSchema = new Schema({
    numbercell: {
        type: Number,
        unique: true // Asegura que cada número de celda sea único
    },
    status: {
        type: String,
        default: 'disponible' // Establece el estado por defecto a 'disponible'
    },
    plateVehicle: {
        type: String,
        maxLength: [6, "max length 6 characters"],
    },
    entryDate: {
        type: Date
    },
    departureDate: {
        type: Date
    },
    pin: {
        type: String
    }
},
{
    timestamps: true, // Añade campos de `createdAt` y `updatedAt`
    versionKey: false // Desactiva el campo de versión `__v`
});

// Exporta el modelo basado en el esquema de celda
export default model("Celda", celdaSchema);

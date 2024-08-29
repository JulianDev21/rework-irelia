import mongoose from 'mongoose';

// Definir el esquema del contador
const counterSchema = new mongoose.Schema({
  _id: String, // Nombre del campo que se va a auto-incrementar, como 'numbercell'
  seq: { type: Number, default: 0 } // Valor del contador
});

// Crear el modelo de contador basado en el esquema
const Counter = mongoose.model('Counter', counterSchema);

export default Counter;

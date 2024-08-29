import mongoose from 'mongoose';
import Celda from '../models/celda.js';
import Counter from '../models/counter.js'; // Asegúrate de importar el modelo Counter correctamente
import { checkCellLimit } from '../js/checkCellLimit.js';
import bcrypt from 'bcryptjs'

// Método GET
export async function getCeldas(req, res) {
    try {
        const celdas = await Celda.find();
        res.json(celdas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Método GET celda especifica
export async function getCelda(req,res){

    const {id} =req.params;

    try{
        const celda = await Celda.findById(id)

        if (!celda){
            return res.status(404).json({msg: 'celda not found'})
        }

        res.json(celda);
    }
    catch(error){
        res.status(500).json({error:error.msg})
    }
}

// Método GET celda con status disponible
export async function getCeldaDisponible(req, res) {
    const { status } = req.params;

    try {
        const celdas = await Celda.find({ status: status });

        if (celdas.length === 0) {
            return res.status(404).json({ msg: 'No celdas found with the provided status' });
        }

        res.json(celdas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Método POST
export async function postCelda(req, res) {
    let msg = 'Celda inserted';
    const body = req.body;

    try {
        // Verificar si se puede añadir una nueva celda
        const canAddMore = await checkCellLimit();

        if(!canAddMore){
            return res.status(400).json({msg:'Cell limit reached'})
        }
        
        // Encuentra y actualiza el contador de manera manual
        const counter = await Counter.findOneAndUpdate(
            { _id: 'numbercell' }, // Usando 'numbercell' como referencia
            { $inc: { seq: 1 } },   // Incrementa el contador
            { new: true, upsert: true } // Crea si no existe y devuelve el nuevo valor
        );

        if (!counter) {
            throw new Error('Counter not found');
        }

        // Asignar el valor de `seq` al campo `numbercell`
        body.numbercell = counter.seq;

        console.log('Body before saving Celda:', body); // Debugging: verifica el objeto body

        // Crear y guardar el nuevo documento
        const celda = new Celda(body);
        await celda.save();
    } catch (error) {
        console.error('Error inserting Celda:', error); // Debugging: muestra el error en consola
        msg = error.message;
    }

    res.json({ msg });
}

//Método put
export async function putCelda(req,res){
    let msg= 'Celda updated'
    const {id} =req.params;

    const { numbercell, status, plateVehicle, entryDate, departureDate, pin} = req.body

    try{
        // Concatenar numbercell y plateVehicle para crear el PIN
        const concatenatedString = `${numbercell}${plateVehicle}`;
        const hashedPin = bcrypt.hashSync(concatenatedString, 10); // Se recomienda usar un salt de 10

        await Celda.findOneAndUpdate({_id:id},{plateVehicle:plateVehicle, entryDate, departureDate:departureDate, pin:hashedPin})
    }catch (error){
        msg=error
    }
    res.json({msg:msg})
}

// Método Delete
export async function deleteCelda(req,res){
    const msg = 'Celda delete'
    const {id} = req.params;
    try{
        await Celda.findByIdAndDelete({_id:id})
    } catch(error){
        res.json({ msg: 'There was a problem deleting the celda' });    }
    res.json({msg:msg})
}


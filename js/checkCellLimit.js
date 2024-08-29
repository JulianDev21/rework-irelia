import Celda from '../models/celda.js';

export async function checkCellLimit(req,res){
    try{
        // Contar el número actual de registros
        const currentCount = await Celda.countDocuments();

        // limite maximo de la base de datos
        const maxCells = 10

        //verificar si se ha alcanzado el limite
        return currentCount < maxCells;
    } catch (error){
        res.json({msg: 'Error checking cell limit', error});
        return false;
    }
}
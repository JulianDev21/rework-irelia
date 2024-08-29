import {Router} from 'express'
import { getCeldas, getCelda, getCeldaDisponible , postCelda, deleteCelda, putCelda} from '../controllers/celdaController.js'
import { parkVehicle } from '../js/parkVehicle.js';
import { exitVehicle } from '../js/exitVehicle.js';

const celdaRouter = Router()

celdaRouter.get('/',getCeldas) // Obtiene todas las celdas
celdaRouter.post('/',postCelda) // Este espera un json en el body vacio para crear la celda correctamente
celdaRouter.get('/:id',getCelda) // Este espera el _id de la celda como parametro 
celdaRouter.get('/status/:status',getCeldaDisponible) // Este espera un valor entre /disponible y /no disponible como parametro
celdaRouter.delete('/:id',deleteCelda) // Este espera el _id de la celda como parametro
celdaRouter.put('/:id', putCelda) // Este espera el _id de la celda como parametro y el json en el body con los campos a actualizar del vehichle
celdaRouter.post('/park',parkVehicle) // Este espera un json en el body de plateVehicle
celdaRouter.post('/exit', exitVehicle) // Este espera un json en el body de plateVehicle



export default celdaRouter
import express, { json } from 'express'
import dbConnection from '../database/config.js'
import { getCelda, postCelda} from '../controllers/celdaController.js'
import celdaRouter from '../routes/celdaRoute.js'

class Server{
    constructor(){
    this.app = express()
    this.listen()
    this.dbConnection()
    this.pathCelda = "/api/celda"
    this.route()
    
    }

    route (){
        this.app.use(json())
        this.app.use(this.pathCelda, celdaRouter)
    }

    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running`)
        })
    }

    async dbConnection(){ // call connet to database
        await dbConnection()
    }
}

export default Server
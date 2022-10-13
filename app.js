/* 
* Archivo de configuración de la aplicación
* En este archivo se configuran los parámetros de la aplicación
* como ser: el puerto, variables de entorno, rutas y middlewares 
*/

const express = require('express')
const cors = require('cors')
require('dotenv').config()

//Inicializaciones

const app = express()

//Settings
const port = process.env.PORT || 3000;

//Middlewares
app.use(cors())
app.use(express.json())
//Archivos estaticos


//Routes


//Inicializar servidor
app.listen(port,()=>{
    console.log(`Servidor inicializado en el puerto ${port}`)
})
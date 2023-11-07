const express = require('express');
const app = express();
const productRouter = require('./routes/ProductRoute')
const userRouter = require('./routes/UserRoute')
//Importar variables de entorno
require("dotenv").config();



//Middleware
app.use(express.json()) // Sirve para que el servidor entienda lo que me envian(JSON)
app.use(productRouter)
app.use(userRouter)

const puerto = process.env.PORT



// Levantar Servidor
app.listen(puerto, () => console.log(`Conectado en puerto: ${puerto}! 🤓`))
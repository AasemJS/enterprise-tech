import express from 'express'
import pkg from 'mongoose';
const { connect, connection } = pkg;
import morgan from 'morgan'
// import { urlencoded, json } from 'body-parser'
import pkg2 from 'body-parser';
const { urlencoded, json } = pkg2;
import http from 'http'

import ImageRoutes from './routes/apiRoutes.js'

// MongoDB connection

connect('mongodb://127.0.0.1:27017/testdb', {useNewUrlParser: true, useUnifiedTopology: true})
const db = connection

db.on('error', (err) =>{
    console.log(err)
})

db.once('open', ()=>{
    console.log("\nDatabase Connection\n");
    console.log('Connection successful')
})

const app = express()

app.use(morgan('dev'))
app.use(urlencoded({extended: true}))
app.use(json())

// Set IP and Port number
const ip = '127.0.0.1' || 'localhost'
const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log("\nServer Details\n");
    console.log(`Server is listening: http://${ip}:${PORT}`)
})

app.use('/api/image', ImageRoutes)
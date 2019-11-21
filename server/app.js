if(process.env.NODE_ENV === 'development') require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./routes')
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3000
// const URI =  process.env.URI
const URI = 'mongodb://localhost:27017/hacktiv-over-flow'

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() =>{
    console.log(`success connect ot mongodb ${URI}`);
})
.catch(()=>{
    console.log(`fail connect to mongodb ${URI}`);
})

app.use('/', router)
app.use(errorHandler)


app.listen(PORT, () => console.log(`this app listening to port`, PORT))
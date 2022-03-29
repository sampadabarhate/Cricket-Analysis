const express = require('express')
const bodyParser = require('body-parser')
const api = require('./routes/api')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const PORT = 3000
const app = express()
app.use(cors())
app.options('*',cors())
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api',api)


app.listen(PORT,function(){
    console.log("Server running is running on localhost:" + PORT);
})
const mongoose = require('mongoose')
const Details = require('../models/details').detailsSchema
const schema = mongoose.Schema
const userSchema = new schema({
    name:String,
    email:String,
    password:String,
    Info:Details
})
module.exports = mongoose.model('user',userSchema,'Users')
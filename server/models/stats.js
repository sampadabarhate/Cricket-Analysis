const mongoose = require('mongoose')
const schema = mongoose.Schema
const statsSchema = new schema({
    Email:String,
    Offleg:Number,
    Onleg:Number
})
const Stats = mongoose.model("stats",statsSchema,"Stats");
module.exports = {statsSchema,Stats}
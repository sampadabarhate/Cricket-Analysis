const mongoose = require('mongoose')
const schema = mongoose.Schema
const performanceSchema = new schema({
    Email:String,
    T20:{
        Year1:Number,
        Year2:Number,
        Year3:Number,
        Year4:Number,
        Year5:Number,
        Runs1:Number,
        Runs2:Number,
        Runs3:Number,
        Runs4:Number,
        Runs5:Number
    },
    OneDay:{
        Year1:Number,
        Year2:Number,
        Year3:Number,
        Year4:Number,
        Year5:Number,
        Runs1:Number,
        Runs2:Number,
        Runs3:Number,
        Runs4:Number,
        Runs5:Number
    },
    Test:{
        Year1:Number,
        Year2:Number,
        Year3:Number,
        Year4:Number,
        Year5:Number,
        Runs1:Number,
        Runs2:Number,
        Runs3:Number,
        Runs4:Number,
        Runs5:Number
    }
    
})
const Performance = mongoose.model("performance",performanceSchema,"Performance");
module.exports = {performanceSchema,Performance}
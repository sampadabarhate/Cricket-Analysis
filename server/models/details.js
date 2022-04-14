const mongoose = require('mongoose')
const schema = mongoose.Schema
const detailsSchema = new schema({
    Email:String,
    Name:String,
    Image:String,
    DateOfBirth:String,
    Nationality:String,
    TotalMatch:Number,
    Total100:Number,
    Total50:Number,
    Total35:Number,
    Totalwickets:Number,
    Out50:Number,
    Out100:Number,
    BestScore:Number,
    
})
const Details = mongoose.model("details",detailsSchema,"Details");
module.exports = {detailsSchema,Details}


/*
TotalRuns:Number,
    TotalMatch:Number,
    Total100:Number,
    Total50:Number,
    Total35:Number,
    Totalwickets:Number,
    Out50:Number,
    Out100:Number,
    BestScore:Number
    */
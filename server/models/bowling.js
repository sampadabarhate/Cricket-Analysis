const mongoose = require('mongoose')
const schema = mongoose.Schema
const bowlingSchema = new schema({
    Email:String,
    TotalWickets:Number,
    TypeOfBowling:String,
    BowlingAverage:Number,
    StrikeRate:Number,
    EconomyRate:Number
})
const Bowling = mongoose.model("bowling",bowlingSchema,"Bowling");
module.exports = {bowlingSchema,Bowling}
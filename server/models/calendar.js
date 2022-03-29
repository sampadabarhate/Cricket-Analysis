const mongoose = require('mongoose')
const schema = mongoose.Schema
const calendarSchema = new schema({
    Date:Date,
    Match:String
})
const Calendar = mongoose.model("calendar",calendarSchema,"Calendar");
module.exports = {calendarSchema,Calendar}


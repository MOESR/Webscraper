const mongoose = require('mongoose')

const leagueSchema = new mongoose.Schema({}, { strict: false })

module.exports = mongoose.model("League", leagueSchema) // "League" is the name that will appear in mongoDB








//const {ObjectId} = mongoose.Schema

// const leagueSchema = new mongoose.Schema({
// 		league: String	
// })
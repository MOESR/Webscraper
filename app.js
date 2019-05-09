const express = require("express")
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const CronJob = require('cron').CronJob
const bodyParser = require('body-parser')

const  {scrapeWebsite} = require('./scrape/scrapFootball')

const dotenv = require('dotenv')
dotenv.config()

const startServer = async () => {
	// database connection
	await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
	console.log('Database connected')

	mongoose.connection.on('error', err => {
		console.log(`DB connection error: ${err.message}`)
	})

	new CronJob('0 0 * * * *', await scrapeWebsite(), null, true, 'America/Los_Angeles', null, true)

	// bring in routes
	const leagueRoutes = require('./routes/league')

	// middleware
	app.use(morgan('dev')) // shows route in terminal from which I get request
	app.use(bodyParser.json())
	app.use('/', leagueRoutes)

	// listening to application
	const port = process.env.PORT || 3000
	await app.listen(port)
	console.log(`A nodeJS API is listening on port: ${port}`)
}

startServer()

/*
eslint global met yarn
heroku - full time server
*/

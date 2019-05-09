const League = require('../models/league')
const  {scrapeWebsite} = require('../scrape/scrapFootball')

exports.getLeagueInfo = (req, res) => {
	const leagues = League.find(
								{}, 
								{ "teamInfo.0": { $slice: 1}}
								)
		//.select("_id league teamInfo")
		.then((leagues) => {
			res.json({leagues: leagues})
	})
	.catch(err => console.log(err))
}

// req = information send to us from frontend
exports.updateLeagueInfo = async (req, res) => {
	const footballInfo = await scrapeWebsite()	
	const newLeague = new League(footballInfo)   // req.body gives title and body

	// console.log(newLeague.teamInfo)

	const leagues = League.find(
								{},
								{ _id: 0, leagues: 0 }
								)
		.then((leagues) => {
			const values = Object.values(leagues)
			//console.log(values)

			// console.log(`This is the new league's team information: \n ${newLeague.teamInfo}`)
			// console.dir(newLeague.teamInfo, { depth: null })

			values.forEach(function(league) {
				console.log(league.get('teamInfo'))
				//console.log(`This is the existing league's team info \n ${oldLeague.teamInfo}`)
				//console.dir(league, { depth: 1 })


			})		
	})

	// upsert: mongoDB

	// if(!leagueExists) {

		// newLeague.save((err, result) => {
		// 	if(err) {
		// 		return res.status(400).json({
		// 			error: err
		// 		})
		// 	}
			
		// 	res.status(200).json({
		// 		post: result
		// 	})
		// })

	// }
	
}



// the return json object of "leagues" structure
// leagues.teamInfo.0.teamName























































//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
/*
// showResult()
exports.getLeagueInfo = async (req, res) => {
	const result = await scrapeWebsite()
	res.send({"Message": result}) 
	// console.log(req.body)
}

exports.updateLeagueInfo = async (req, res) => {
	let result = new League()
	league.save((err, result) => {
		if(err) {
			return res.status(400).json({
				error: err
			})
		}
		res.json(result)
		})
	// await result.save((err, result) => {
	// 	if(err) {
	// 		return res.status(400).json({
	// 			error: err
	// 		})
	// 	}
	// 	res.json(result)
	// })
}
*/
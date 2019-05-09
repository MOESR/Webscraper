let cheerio = require('cheerio');
let jsonframe = require('jsonframe-cheerio');
let got = require('got');
let fs = require('fs');
let request = require('request');


const url = 'http://www.footstats.co.uk/index.cfm?task=league_full';
const writeStream = fs.createWriteStream('football.csv');

async function scrapeWebsite() {
	const html  = await got(url);
	let $ = cheerio.load(html.body);
	jsonframe($); 	

	let leagueInfo = {
		"leagueInfo": {
			_s: "caption",
			_d: [{
				"league": "h3"
			}]
		}
	}

	let footballTeams = { 
			"teamInfo": {
				_s: "tr",
				_d: [{
					"teamName": "td:nth-child(2)",
					"ranking": "td:nth-child(1)",
					"matchesPlayed": "td:nth-child(3)",
					"wins": "td:nth-child(4)",
					"draws": "td:nth-child(5)",
					"losses": "td:nth-child(6)",
					"goalsFor": "td:nth-child(7)",
					"goalsAgainst": "td:nth-child(8)",
					"goalsDiff": "td:nth-child(9)",
					"points": "td:nth-child(10)"
					}]
				}
			};

	let resultTeam = $('tbody').scrape(footballTeams); //tbody = selector
	let resultLeague = $('table').scrape(leagueInfo);
	let footballInfo = { ...resultLeague.leagueInfo[0], ...resultTeam }
	// console.log(footballInfo.teamInfo[0].teamName);
	// console.dir(footballInfo, { depth: null })
	// console.log(footballInfo)
	return footballInfo;

	//Write headers
	writeStream.write(`${footballInfo.league} \n TeamName,Ranking,MatchesPlayed,Wins,Draws,Losses,GoalsFor,GoalsAgainst,GoalsDifference,Points \n`)
	
	//Write row to CSV
	for (let i=0; i<footballInfo.teamInfo.length; i++) {
		if (i==0) {
			writeStream
		}

		const parts = [
			footballInfo.teamInfo[i].teamName,
			footballInfo.teamInfo[i].ranking,
			footballInfo.teamInfo[i].matchesPlayed,
			footballInfo.teamInfo[i].wins,
			footballInfo.teamInfo[i].draws,
			footballInfo.teamInfo[i].losses,
			footballInfo.teamInfo[i].goalsFor,
			footballInfo.teamInfo[i].goalsAgainst,
			footballInfo.teamInfo[i].goalsDiff,
			footballInfo.teamInfo[i].points
		]

		writeStream.write( `${parts.join(',')} \n`)
	}
	

}

// async function showResult() {
// 	const result  = await scrapeWebsite();
// 	console.log(result)
// }

// scrapeWebsite()

module.exports.scrapeWebsite = scrapeWebsite;







// var e = document.getElementById('league'); //contains the html part with all menu options (so everything under id=league)
// 	//You can use indexing on e: e[5] returns the 6th element
// var menuOption = e.options[e.selectedIndex].value; //returns the current selected option. Alternative: .text

// document.getElementById('league').selectedIndex = 'X'; //Changes dropdown option to X, X=index number

//This function doesn't work
// function getLeague() => {
// 	theform.from.value = a;
// 	theform.to.value = b;
// 	for(let i = 0; i < e.length; i++) {
// 		console.log('League: ' + e.option[i].text)
// 		if(e.options[i].value == c) {
// 			e.selectedIndex = i;
// 		}
// 	}
// }






/*
const testTest = $('.col-lg-12'); //class=col-lg-12
	// const output = testTest.find('h3').text()
	// const output = testTest.children('h3').text();
	// console.log(testTest.text());
	// console.log(output);

	//Loop over items: headers of the table. Within row='row' the th-tag is looped over
	$('.row th').each((i, element) => {
		const item = $(element).text();
		//console.log(item);
	})
	

	$('.row').each((i, el) => {
		const league = $(el)
			.find('caption')
			.text()
			.replace(/\s\s+/g, '');
		// const theader = $(el)
		// 	.find('th')
		// 	.join(' ');
		// console.log(`${league} \n ${theader}`)
	})
	$('.row').map((i, element) => {
		const x = $(this)
			.text()
	}).get('th').length 

	
*/

// let cheerio = require('cheerio')
// let request = require('request')
// let topStories = []

// request('http://www.footstats.co.uk/index.cfm?task=league_full', (error, response, html) => {
// 	if(!error && response.statusCode == 200) {
// 		const $ = cheerio.load(html);
		
// 		// console.log($('h1').map(function(i, el) {
// 		// 	return $(this).text()
// 		// }).get().join(' ')) //Return a single return value

// 		const  teams = [];
// 		$('.odd:nth-child(1) .sorting_1+ td').each(function(i, el) {
// 			teams[i] = $(this).text();
// 		}); //Creates an array of blogpost titles
// 		teams.forEach(function(item) {
// 			console.log(item) //Return the elements in array
// 		})
// 		console.log(teams[1])

// 		// const titles = $('h1'); //Dit werkt max max 1 verwijzing, geen verfijnende structuur
// 		// console.log(titles.text())

// 	} else {
// 		console.log('error')
// 	}
// })
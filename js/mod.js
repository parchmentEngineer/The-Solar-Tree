let modInfo = {
	name: "The ??? Tree",
	id: "mymod",
	author: "nobody",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (5), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "Literally nothing",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
	
	updateTime()

	let gain = new Decimal(1)
	if (hasUpgrade('s', 11)) gain = gain.times(sunlight/100)
	if (hasUpgrade('s', 12)) gain = gain.times(upgradeEffect('s', 12))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

let minutes = 0
let hours = 6
let sunlight = 100
let moonlight = 100

function updateTime() {
	minutes = minutes+0.02;
	if(minutes >= 6) {
		minutes = 0
		hours += 1
		if (hours==6) {
			if (hasUpgrade('s', 13)) {
				player['s'].points = player['s'].points.add(upgradeEffect('s', 13))
				if (player['s'].points.gt(player['s'].best)) { player['s'].best = player['s'].points }
			}
		}
	}
	if(hours >= 24) {
		hours = 0
	}
	if(hours >= 6 && hours <= 17) {
		sunlight = Math.floor(((36-Math.abs(12*6-((hours*6)+(Math.floor(minutes*100)/100))))/36)*100)+100
		moonlight = 100
	} else {
		moonlight = Math.abs(Math.floor(((36-Math.abs(12*6-(((hours-12)*6)+(Math.floor(minutes*100)/100))))/36)*100)+100)
		sunlight = 100
	}
}

// Display extra things at the top of the page
var displayThings = [
	function() {
		toreturn = "Time: "+hours+":"+Math.floor(minutes)+"0"
		if(hours >= 6 && hours <= 17) {toreturn += " (Sunlight - "+sunlight+"%)"}
		else {toreturn += " (Moonlight - "+moonlight+"%)"}
		return toreturn
	}
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
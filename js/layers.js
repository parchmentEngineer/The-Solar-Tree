/*addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
*/

addLayer("s", {
    name: "solar", 
    symbol: "S", 
    position: 0, 
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		best: new Decimal(0),
    }},
    color: "#dff516",
    requires: new Decimal(5), 
    resource: "Solaris Essence",
    baseResource: "points", 
    baseAmount() {return player.points}, 
    type: "normal",
    exponent: 0.5,
    gainMult() { 
        mult = new Decimal(1)
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    row: 0,
    hotkeys: [
        {key: "s", description: "S: Reset for Solaris Essence", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
	upgrades: {
		11: {
			title: "Solar Rays",
			description: "Multiply point gain by Sunlight amount.",
			cost: new Decimal(1),
		},
		12: {
			title: "Illumination",
			description: "Multiply point gain by best Solaris Essence",
			effect() {return player['s'].best},
			//effectDisplay() {return upgradeEffect(this.layer, this.id)},
			cost: new Decimal(5),
		},
		13: {
			title: "Daybreak",
			description: "Gain 1,000% of Solaris Essensce gain at 6:00 each day.",
			effect() {return getResetGain(this.layer)*10},
			cost: new Decimal(40),
		},
    },
})
import rebelCards from './rebelCards.js'
import empireCards from './empireCards.js'
import neutralCards from './neutralCards.js'

const { allianceShuttle, rebelTrooper, templeGuardian } = rebelCards
const { imperialShuttle, stormtrooper, inquisitor } = empireCards
const { outerRimPilot } = neutralCards

const rebel = [
	allianceShuttle,
	allianceShuttle,
	allianceShuttle,
	allianceShuttle,
	allianceShuttle,
	allianceShuttle,
	allianceShuttle,
	rebelTrooper,
	rebelTrooper,
	templeGuardian,
]
const empire = [
	imperialShuttle,
	imperialShuttle,
	imperialShuttle,
	imperialShuttle,
	imperialShuttle,
	imperialShuttle,
	imperialShuttle,
	stormtrooper,
	stormtrooper,
	inquisitor,
]

const outerRimPilots = [
	outerRimPilot,
	outerRimPilot,
	outerRimPilot,
	outerRimPilot,
	outerRimPilot,
	outerRimPilot,
	outerRimPilot,
	outerRimPilot,
	outerRimPilot,
	outerRimPilot,
]
const starterDeckLists = {
	rebel,
	empire,
	outerRimPilots,
}

export default starterDeckLists

import common from './game-img/NFT/common-1.png'
import epic from './game-img/NFT/epic-1.png'
import rare from './game-img/NFT/rare-1.png'

const trucks = [
	{
		name: 'Common',
		cost: 100,
		fuelTime: 9,
		repairTime: 150,
		harvestTime: 10, 
		image: common
	},
	{
		name: 'Rare',
		cost: 250,
		fuelTime: 7,
		repairTime: 144,
		harvestTime: 8, 
		image: rare
	},
	{
		name: 'Epic',
		cost: 600,
		fuelTime: 6,
		repairTime: 114,
		harvestTime: 7, 
		image: epic
	},
]

export default trucks
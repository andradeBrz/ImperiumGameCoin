

import { defineStore, storeToRefs } from "pinia"
import { ref } from "vue"
import { useWeb3Store } from "./web3Store"

import common from '../assets/game-img/NFT/common-1.png'
import epic from '../assets/game-img/NFT/epic-1.png'
import rare from '../assets/game-img/NFT/rare-1.png'

export const useUserStore = defineStore('userStore', () => {
	
	//////////////////Use web3/////////////////////
	const web3Store = useWeb3Store()
	
	const {
		web3, 
		contract, 
		userAddress
	} = storeToRefs(web3Store)
	
	//////////////////////////////////////////////

	const userBalance = ref(0)

	const getWalletAddress = async () => {

		if(web3.value){
			web3.value.eth
				.getAccounts()
				.then(accounts => {
					userAddress.value = accounts[0]
				})
				.catch(error => {
					console.error("Falha ao buscar endereço do usuário: ", error)
				})
		}
	}
	
	function fromWeiToIGC(valueInWei, decimals = 8, showDecimals = true) {
		const valueInIGC = valueInWei / 10 ** decimals
		
		return showDecimals ? valueInIGC.toFixed(decimals) : valueInIGC.toFixed(0)
	}

	const getUserBalance = async () => {
		console.log(web3.value, contract.value, userAddress.value)
		if (web3.value && contract.value && userAddress.value) {
			const balanceInWei = await contract.value.methods
				.balanceOf(userAddress.value)
				.call()
            
			userBalance.value = fromWeiToIGC(balanceInWei, 8, false)
		}
	}

	
	const userTrucks = ref([
		{
			name: 'Common Truck',
			level: '10',
			
			fuelTime: '45',
			travelTime: '50',
			repairTime: '200',
			
			fuelCapacity: '100',
			image: common
		},
		{
			name: 'Common Truck',
			level: '5',
			
			fuelTime: '15',
			travelTime: '200',
			repairTime: '10',
			
			fuelCapacity: '50',
			image: common
		},
		{
			name: 'Rare Truck',
			level: '10',
			
			fuelTime: '175',
			travelTime: '500',
			repairTime: '300',
			
			fuelCapacity: '200',
			image: rare
		},
		{
			name: 'Epic Truck',
			level: '1',
			
			fuelTime: '500',
			travelTime: '20',
			repairTime: '700',
			
			fuelCapacity: '400',
			image: epic
		},
	])

	const decrementTime = () => {
		userTrucks.value.forEach(truck => {
			truck.fuelTime > 0 ? truck.fuelTime-- : truck.needFuel = true
			truck.travelTime > 0 ? truck.travelTime-- : truck.travelFinished = true
			truck.repairTime > 0 ? truck.repairTime-- : truck.needRepair = true
		})
	}

	const interval = setInterval(decrementTime, 1000)

	const needRepairTrucks = ref(userTrucks.value.filter(truck => truck.needRepair))
	const needFuelTrucks = ref(userTrucks.value.filter(truck => truck.needFuel))
	const travelingTrucks = ref(userTrucks.value.filter(truck => !truck.needRepair && !truck.needFuel && !truck.travelFinished))

	return {
		// refs
		userBalance,
		userAddress,
		userTrucks,
		needRepairTrucks,
		needFuelTrucks,
		travelingTrucks,

		// funcs
		getWalletAddress,
		getUserBalance,
    
	}
})
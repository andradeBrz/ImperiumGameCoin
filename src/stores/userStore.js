

import { defineStore, storeToRefs } from "pinia"
import { ref } from "vue"
import { useWeb3Store } from "./web3Store"


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

	return {
		// refs
		userBalance,
		userAddress,

		// funcs
		getWalletAddress,
		getUserBalance,
    
	}
})
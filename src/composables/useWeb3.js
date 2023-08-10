import { ref } from "vue";
import Web3 from "web3";
import { contractABI, contractAddress } from "../contract";

export function useWeb3() {
  const web3 = ref(null);
  const contract = ref(null);
  const userAddress = ref(null);

  async function initWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      web3.value = window.web3;
      contract.value = new web3.value.eth.Contract(contractABI, contractAddress);

      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        userAddress.value = accounts[0];
      } catch (error) {
        console.error("User denied account access");
      }
    }
  }

  return { web3, contract, userAddress, initWeb3 };
}

export const contractAddress = "0x3CdCf98F890E882aAFdD74637C6e72F817Ff0D5B"

export const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address",
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address",
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256",
      },
    ],
    "name": "Approval",
    "type": "event",
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "machineId",
        "type": "uint256",
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string",
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "uniqueId",
        "type": "uint256",
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string",
      },
    ],
    "name": "HavestEvent",
    "type": "event",
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "machineId",
        "type": "uint256",
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string",
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "uniqueId",
        "type": "uint256",
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string",
      },
    ],
    "name": "MachineUpgradeEvent",
    "type": "event",
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "machineId",
        "type": "uint256",
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string",
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "uniqueId",
        "type": "uint256",
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string",
      },
    ],
    "name": "NewMachine",
    "type": "event",
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "machineId",
        "type": "uint256",
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string",
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "uniqueId",
        "type": "uint256",
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string",
      },
    ],
    "name": "ReFuelEvent",
    "type": "event",
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "machineId",
        "type": "uint256",
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string",
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "uniqueId",
        "type": "uint256",
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string",
      },
    ],
    "name": "RepairEvent",
    "type": "event",
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address",
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address",
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256",
      },
    ],
    "name": "Transfer",
    "type": "event",
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address",
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address",
      },
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address",
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256",
      },
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool",
      },
    ],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "availableForRewards",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address",
      },
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address",
      },
    ],
    "name": "balances",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256",
      },
      {
        "internalType": "uint256",
        "name": "_code",
        "type": "uint256",
      },
    ],
    "name": "buymachine",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "contractOwner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "deadCoin",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "decimalPlaces",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "getCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "count",
        "type": "uint256",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address",
      },
    ],
    "name": "getMachinesByOwner",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_machineId",
        "type": "uint256",
      },
    ],
    "name": "harvest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256",
      },
    ],
    "name": "machineToOwner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_machineId",
        "type": "uint256",
      },
    ],
    "name": "machineUpgrade",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256",
      },
    ],
    "name": "machines",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string",
      },
      {
        "internalType": "uint256",
        "name": "uniqueId",
        "type": "uint256",
      },
      {
        "internalType": "uint32",
        "name": "level",
        "type": "uint32",
      },
      {
        "internalType": "uint32",
        "name": "fuelTime",
        "type": "uint32",
      },
      {
        "internalType": "uint32",
        "name": "repairTime",
        "type": "uint32",
      },
      {
        "internalType": "uint32",
        "name": "harvestTime",
        "type": "uint32",
      },
      {
        "internalType": "uint256",
        "name": "codeUpline",
        "type": "uint256",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address",
      },
    ],
    "name": "maximumRelationshipBonus",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "miningCoin",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "numberOfCoins",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "qtdForSale",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_machineId",
        "type": "uint256",
      },
    ],
    "name": "reFuel",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_machineId",
        "type": "uint256",
      },
    ],
    "name": "repair",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "totalApprovals",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "totalTransfers",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address",
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256",
      },
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool",
      },
    ],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address",
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address",
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256",
      },
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool",
      },
    ],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "valueLocked",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
]

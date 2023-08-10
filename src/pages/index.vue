<template>
  <VContainer fluid>
    <VRow>
      <VCol
        cols="12"
        md="6"
      >
        <VCard
          class="mb-6"
          outlined
        >
          <VCardTitle class="text-h6 font-weight-bold">
            Informações da carteira
          </VCardTitle>
          <VCardText class="space-y-1">
            <div>Endereço da carteira: <strong>{{ userAddress }}</strong></div>
            <div>Seu saldo atual é: <strong>{{ userBalance }} YES</strong></div>
            <div>Saldo em BNB: <strong>{{ bnbBalance }}</strong></div>
          </VCardText>
        </VCard>
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <VCard
          class="mb-6"
          outlined
        >
          <VCardTitle class="text-h6 font-weight-bold">
            Informações do token
          </VCardTitle>
          <VCardText>
            <div>Nome do token: <strong>{{ tokenName }}</strong></div>
            <div>Símbolo do token: <strong>{{ tokenSymbol }}</strong></div>
            <div>Máximo de tokens: <strong>{{ formatYesToken(totalSupply) }}</strong></div>
            <div>Total de tokens queimados: <strong>{{ formatYesToken(deadCoin) }}</strong></div>
            <div>Total de tokens para mineração: <strong>{{ formatYesToken(gamePool) }}</strong></div>
            <div>Total de tokens bloqueados: <strong>{{ formatYesToken(valueLocked) }}</strong></div>
            <div>Total de tokens para venda: <strong>{{ formatYesToken(qtdPresale) }}</strong></div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VRow>
      <VCol
        cols="12"
        md="6"
      >
        <VCard
          class="mb-6"
          outlined
        >
          <VCardTitle class="text-h6 font-weight-bold">
            Distribuição dos tokens
          </VCardTitle>
          <VCardText>
            {{ pieChartData }}
            <ApexChart
              v-if="pieChartData.length"
              type="pie"
              :options="pieChartOptions"
              :series="pieChartData"
            />
          </VCardText>
        </VCard>
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <VCard
          class="mb-6"
          outlined
        >
          <VCardTitle class="text-h6 font-weight-bold">
            Principais detentores de tokens
          </VCardTitle>
          <VCardText>
            <ApexChart              
              type="bar"
              :options="barChartOptions"
              :series="barChartData"
            />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup>
import { useWeb3 } from "../composables/useWeb3"
import { ref, watchEffect } from "vue"
import ApexChart from 'vue3-apexcharts'

const { web3, contract, userAddress, initWeb3 } = useWeb3()
const userBalance = ref(0)
const tokenName = ref("")
const tokenSymbol = ref("")
const totalSupply = ref(0)
const decimals = ref(0)
const deadCoin = ref(0)
const miningCoin = ref(0)
const gamePool = ref(0)
const valueLocked = ref(0)
const qtdPresale = ref(0)
const contractOwner = ref("")
const bnbBalance = ref(0)

const pieChartData = ref([])
const pieChartOptions = ref({})
const barChartData = ref([])
const barChartOptions = ref({})

async function getBNBBalance() {
  if (web3.value && userAddress.value) {
    const balanceInWei = await web3.value.eth.getBalance(userAddress.value)

    bnbBalance.value = web3.value.utils.fromWei(balanceInWei, 'ether')
  }
}

function fromWeiToYespag(valueInWei, decimals = 8, showDecimals = true) {
  const valueInYespag = valueInWei / 10 ** decimals
  
  return showDecimals ? valueInYespag.toFixed(decimals) : valueInYespag.toFixed(0)
}

function formatTokenValue(value) {
  if (typeof value !== 'string') return "0 YES"
  const formattedValue = parseFloat(value).toFixed(0)
  
  return `${formattedValue} YES`
}

async function getUserBalance() {
  if (web3.value && contract.value && userAddress.value) {
    const balanceInWei = await contract.value.methods
      .balanceOf(userAddress.value)
      .call()

    userBalance.value = fromWeiToYespag(balanceInWei, 8, false)
  }
}

async function loadContractInfo() {
  if (web3.value && contract.value) {
    tokenName.value = await contract.value.methods.name().call()
    tokenSymbol.value = await contract.value.methods.symbol().call()
    totalSupply.value = fromWeiToYespag(await contract.value.methods.totalSupply().call())
    decimals.value = await contract.value.methods.decimals().call()
    deadCoin.value = fromWeiToYespag(await contract.value.methods.deadCoin().call())
    miningCoin.value = fromWeiToYespag(await contract.value.methods.miningCoin().call())
    gamePool.value = fromWeiToYespag(await contract.value.methods.gamePool().call())
    valueLocked.value = fromWeiToYespag(await contract.value.methods.valueLocked().call())
    qtdPresale.value = fromWeiToYespag(await contract.value.methods.qtdPresale().call())
    contractOwner.value = await contract.value.methods.contractOwner().call()

    pieChartData.value = [
      { name: 'Tokens queimados', value: parseInt(deadCoin.value) },
      { name: 'Tokens para mineração', value: parseInt(miningCoin.value) },
      { name: 'Tokens bloqueados', value: parseInt(valueLocked.value) },
      { name: 'Tokens para venda', value: parseInt(qtdPresale.value) },
      { name: 'Tokens em circulação', value: parseInt(totalSupply.value - deadCoin.value - miningCoin.value - valueLocked.value - qtdPresale.value) },
    ]

    pieChartOptions.value = {
      chart: {
        type: 'pie',
      },
      labels: pieChartData.value.map(data => data.name),
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      }],
    }

    barChartData.value = [
      {
        data: [300, 200, 100, 80, 50], // Substitua por dados reais
      },
    ]

    barChartOptions.value = {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ['Endereço 1', 'Endereço 2', 'Endereço 3', 'Endereço 4', 'Endereço 5'], // Substitua por endereços reais
      },
    }
  }
}





function formatYesToken(value) {
  if (typeof value !== 'string' && typeof value !== 'number') return "0 YES"
  const formattedValue = Number(value).toLocaleString('en-US', { minimumFractionDigits: 0 })
  
  return `${formattedValue} YES`
}

watchEffect(async () => {
  await getUserBalance()
  await getBNBBalance()
})

initWeb3()

watchEffect(() => {
  if (web3.value && !userAddress.value) {
    web3.value.eth
      .getAccounts()
      .then(accounts => {
        userAddress.value = accounts[0]
      })
      .catch(error => {
        console.error("Falha ao buscar endereço do usuário: ", error)
      })
  }
})

watchEffect(() => {
  if (web3.value && contract.value) {
    loadContractInfo()
  }
})
</script>
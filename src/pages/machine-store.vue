<script setup>
import laptopGirl from '@images/illustrations/laptop-girl.png'
import { useWeb3 } from "../composables/useWeb3"
import { ref, computed } from 'vue'

const { web3, contract, userAddress, initWeb3 } = useWeb3()

const scrollToCalculator = () => {
  const calculatorElement = document.getElementById('calculator')
  const elementPosition = calculatorElement.getBoundingClientRect().top + window.pageYOffset - 75

  window.scrollTo({
    top: elementPosition,
    behavior: 'smooth',
  })
}

const selectedMachine = ref(null)

const machines = ref([
  {
    name: 'MineX',
    cost: 100,
    chargeEvery: 9,
    chargeCost: 50,
    repairEvery: 150,
    repairCost: 75,
    rewardEvery: 10,
    rewardValue: 75,
    available: 50000,
  },
  {
    name: 'PowerMine',
    cost: 250,
    chargeEvery: 7,
    chargeCost: 50,
    repairEvery: 144,
    repairCost: 188,
    rewardEvery: 8,
    rewardValue: 105,
    available: 35000,
  },
  {
    name: 'DragonForge',
    cost: 600,
    chargeEvery: 6,
    chargeCost: 50,
    repairEvery: 114,
    repairCost: 450,
    rewardEvery: 7,
    rewardValue: 155,
    available: 15000,
  },
])

const days = ref(1)
const quantity = ref(1)
const maxQuantity = ref(50)
const operator = ref(false)

const machineData = computed(() => machines.value.find(machine => machine.name === selectedMachine.value))

const machineValue = computed(() => machineData.value && Math.floor(machineData.value.cost * quantity.value).toFixed(2) )

const fuelCost = computed(() => 
  machineData.value && 
    (Math.floor(days.value / machineData.value.chargeEvery) * machineData.value.chargeCost * quantity.value).toFixed(2),
)

const repairCost = computed(() => 
  machineData.value && 
    (Math.floor(days.value / machineData.value.repairEvery) * machineData.value.repairCost * quantity.value).toFixed(2),
)

const rewards = computed(() => 
  machineData.value && 
    (Math.floor(days.value / machineData.value.rewardEvery) * machineData.value.rewardValue * quantity.value).toFixed(2),
)

const totalCost = computed(() => 
  machineData.value && 
    (parseFloat(fuelCost.value) + parseFloat(repairCost.value) + machineData.value.cost * quantity.value).toFixed(2),
)

const profit = computed(() => 
  machineData.value && 
    ((parseFloat(rewards.value) - parseFloat(totalCost.value)) > 0 ? (parseFloat(rewards.value) - parseFloat(totalCost.value)) * (operator.value ? 0.85 : 1) : (parseFloat(rewards.value) - parseFloat(totalCost.value))).toFixed(2),
)

const faqs = [
  {
    question: 'O que é uma máquina de mineração de token YES?',
    answer: 'Uma máquina de mineração de token YES é um dispositivo virtual que você pode adquirir para gerar tokens YES. Existem diferentes tipos de máquinas disponíveis, cada uma com suas próprias características e custos associados.',
  },
  {
    question: 'Como a mineração de tokens YES funciona?',
    answer: 'Cada máquina de mineração gera tokens YES em um certo ritmo, dependendo do seu tipo. No entanto, as máquinas precisam ser recarregadas e reparadas periodicamente, o que tem um custo em tokens YES. O lucro líquido é calculado subtraindo-se os custos de combustível e reparo das recompensas obtidas.',
  },
  {
    question: 'O que significa contratar um operador?',
    answer: 'Contratar um operador significa que você terá uma operação de mineração totalmente automatizada. No entanto, isso requer que você bloqueie o custo total de tokens no contrato e aguarde a quantidade de dias selecionada para resgatar o valor bloqueado mais os lucros. Contratar um operador também proporciona um desconto de 15% no lucro.',
  },
  {
    question: 'Qual é a máxima quantidade de máquinas que posso ter?',
    answer: 'Atualmente, o sistema permite que você tenha até 50 máquinas de mineração simultaneamente.',
  },
  {
    question: 'Por que preciso recarregar e reparar minha máquina?',
    answer: 'As máquinas de mineração consomem combustível à medida que operam e, eventualmente, precisam ser reparadas. Ambos têm um custo associado em tokens YES, que deve ser considerado ao calcular o lucro líquido da mineração.',
  },
  {
    question: 'Como posso simular o desempenho da minha máquina de mineração?',
    answer: 'Você pode usar nossa calculadora de rendimentos para simular o desempenho de sua máquina de mineração. Basta selecionar o tipo de máquina, a quantidade de máquinas, a quantidade de dias de mineração e se deseja ou não contratar um operador.',
  },
]
</script>

<template>
  <VCard class="pt-6">
    <VCardText class="pt-12 mb-16 pb-16">
      <VRow>
        <VCol
          cols="12"
          sm="8"
          md="12"
          class="mx-auto"
        >
          <AppPricing md="4" />
        </VCol>
      </VRow>
    </VCardText>

    <VRow class="page-pricing-free-trial-banner-bg">
      <VCol
        cols="12"
        md="10"
        class="d-flex align-center flex-md-row flex-column position-relative mx-auto"
      >
        <div class="text-center text-md-start py-10 px-10 px-sm-0">
          <h3 class="text-h5 text-primary mb-2">
            Ainda não está convencido?
          </h3>
          <p class="text-sm">
            Faça uma simulação de retorno do seu investimento.
          </p>

          <VBtn
            class="mt-4"
            @click="scrollToCalculator"
          >
            Fazer simulação
          </VBtn>
        </div>

        <div class="free-trial-illustrator">
          <VImg
            :src="laptopGirl"
            :width="230"
          />
        </div>
      </VCol>
    </VRow>

    <div>
      <VCardText class="text-center mt-16">
        <h4
          id="calculator"
          class="text-h4 mb-2"
        >
          Calculadora de rendimentos
        </h4>
        <p>Simule o desempenho da sua nova máquina de mineração do token YES</p>
      </VCardText>

      <VCardText class="mb-16 mt-2">
        <VRow>
          <VCol
            cols="12"
            md="11"
            class="mx-auto"
          >
            <VCardText>Selecione sua máquina</VCardText>
            <VRadioGroup
              v-model="selectedMachine"
              inline
            >
              <div>
                <VRadio
                  v-for="machine in machines"
                  :key="machine"
                  :label="machine.name"
                  :value="machine.name"
                />
              </div>
            </VRadioGroup>

            <VCardText>Selecione a quantidade de máquinas</VCardText>
            <VSlider
              v-model="quantity"
              :max="maxQuantity"
              :min="1"
              color="secondary"
              :disabled="!selectedMachine"
              thumb-label="hover"
              step="1"
            />

            <VCardText>Selecione a quantidade de dias de mineração</VCardText>
            <VSlider
              v-model="days"
              :max="365"
              :min="1"
              :disabled="!selectedMachine"
              thumb-label="hover"
              step="1"
            />

            <VCardText>Contratar operador (15% de desconto no lucro)</VCardText>
            <VSwitch
              v-model="operator"
              :disabled="!selectedMachine"
            />
            <small class="text-warning">Observação: Contratar um operador, significa que você terá uma operação de mineração totalmente automatizada, com isso é necessário bloquear no contrato o custo total de tokens e aguardar a quantidade de dias selecionado para resgatar o valor bloqueado mais os lucros.</small>

            <VCardText class="mt-4">
              Resultado
            </VCardText>
            <VTable class="text-no-wrap border rounde">
              <thead>
                <tr>
                  <th>Dias</th>
                  <th>Valor máquina</th>
                  <th>Gasto com combustível</th>
                  <th>Gasto com reparos</th>
                  <th>Custo Total</th>
                  <th>Recompensas</th>                  
                  <th>Lucro</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ days }}</td>
                  <td>{{ machineValue }} YES</td>
                  <td>{{ fuelCost }} YES</td>
                  <td>{{ repairCost }} YES</td>
                  <td class="text-warning">
                    {{ totalCost }} YES
                  </td>
                  <td class="text-info">
                    {{ rewards }} YES
                  </td> 
                  <td :class="profit < 0 ? 'text-error' : 'text-success'">
                    {{ profit }} YES
                  </td>
                </tr>
              </tbody>
            </VTable>
          </VCol>
        </VRow>
      </VCardText>
    </div>

    <div>
      <VCardText class="bg-var-theme-background py-16">
        <div class="text-center">
          <h4 class="text-h4 mb-2">
            Perguntas Frequentes
          </h4>
          <p>
            Estamos aqui para ajudar a responder às perguntas mais comuns sobre a mineração de tokens YES.
          </p>
        </div>

        <VExpansionPanels class="py-6 px-16">
          <VExpansionPanel
            v-for="faq in faqs"
            :key="faq.question"
            :title="faq.question"
            :text="faq.answer"
          />
        </VExpansionPanels>
      </VCardText>
    </div>
  </VCard>
</template>

<style lang="scss">
.page-pricing-free-trial-banner-bg {
  /* stylelint-disable-next-line color-function-notation */
  background-color: rgba(var(--v-theme-primary), var(--v-selected-opacity));
}

@media screen and (min-width: 960px) {
  .free-trial-illustrator {
    position: absolute;
    inset-block-end: 0;
    inset-inline-end: 10%;
  }
}

@media screen and (max-width: 959px) {
  .free-trial-illustrator {
    position: relative;
    inset-block-end: -11px;
  }
}

.v-slider__thumb {
  background-color: #ff0000 !important; // Mude para a cor que deseja
}
</style>

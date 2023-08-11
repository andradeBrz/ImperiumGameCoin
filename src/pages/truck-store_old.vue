<script setup>
import { ref, computed } from 'vue'

const trucks = ref([
	{
		name: 'Common',
		cost: 100,
		fuelTime: 9,
		repairTime: 150,
		harvestTime: 10, 
	},
	{
		name: 'Rare',
		cost: 250,
		fuelTime: 7,
		repairTime: 144,
		harvestTime: 8, 
	},
	{
		name: 'Epic',
		cost: 600,
		fuelTime: 6,
		repairTime: 114,
		harvestTime: 7, 
	},
])
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

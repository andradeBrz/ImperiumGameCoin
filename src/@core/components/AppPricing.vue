<script setup>
import safeBoxWithGoldenCoin from '@images/misc/3d-safe-box-with-golden-dollar-coins.png'
import spaceRocket from '@images/misc/3d-space-rocket-with-smoke.png'
import dollarCoinPiggyBank from '@images/misc/dollar-coins-flying-pink-piggy-bank.png'

const props = defineProps({
  xs: {
    type: [
      Number,
      String,
    ],
    required: false,
  },
  sm: {
    type: [
      Number,
      String,
    ],
    required: false,
  },
  md: {
    type: [
      String,
      Number,
    ],
    required: false,
  },
  lg: {
    type: [
      String,
      Number,
    ],
    required: false,
  },
  xl: {
    type: [
      String,
      Number,
    ],
    required: false,
  },
})

const annualMonthlyPlanPriceToggler = ref(true)

const pricingPlans = [
  {
    name: 'MineX',
    tagLine: 'Mineração fácil e descomplicada para você começar a ganhar agora mesmo!',
    logo: dollarCoinPiggyBank,
    monthlyPrice: 100,
    yearlyPrice: 800,
    disponible: 50000,
    isPopular: false,
    current: false,
    features: [
      'Nível: 1 | Máx: 20',
      'Recarga a cada: 9 dias',
      'Custo da recarga: 50 YES',
      'Reparo a cada: 150 dias',
      'Custo do reparo: 75 YES',
      'Recompensas a cada: 10 dias',
      'Valor da recompensa: 75 YES',
    ],
  },
  {
    name: 'PowerMine',
    tagLine: 'Desbloqueie o poder da mineração e alcance resultados extraordinários.',
    logo: safeBoxWithGoldenCoin,
    monthlyPrice: 250,
    yearlyPrice: 2000,
    disponible: 35000,
    isPopular: false,
    current: false,
    features: [
      'Nível: 1 | Máx: 20',
      'Recarga a cada: 7 dias',
      'Custo da recarga: 50 YES',
      'Reparo a cada: 144 dias',
      'Custo do reparo: 188 YES',
      'Recompensas a cada: 8 dias',
      'Valor da recompensa: 105 YES',
    ],
  },
  {
    name: 'DragonForge',
    tagLine: 'Libere o poder lendário da mineração com a máquina mais poderosa do mercado.',
    logo: spaceRocket,
    monthlyPrice: 600,
    yearlyPrice: 4800,
    disponible: 15000,
    isPopular: true,
    current: false,
    features: [
      'Nível: 1 | Máx: 20',
      'Recarga a cada: 6 dias',
      'Custo da recarga: 50 YES',
      'Reparo a cada: 114 dias',
      'Custo do reparo: 450 YES',
      'Recompensas a cada: 7 dias',
      'Valor da recompensa: 155 YES',
    ],
  },
]
</script>

<template>
  <!-- 👉 Title and subtitle -->
  <div class="text-center">
    <h4 class="text-h4 pricing-title mb-4">
      Loja de Máquinas Virtuais
    </h4>
    <p class="mb-0">
      Adquira sua máquina virtual para minerar o token YES
    </p>
    <p>Não perca tempo, garanta já a sua! Ofertas limitadas!</p>
  </div>

  <!-- 👉 Annual and monthly price toggler -->

  <div class="d-flex align-center justify-center mx-auto my-10">
    <VLabel
      for="pricing-plan-toggle"
      class="me-2"
    >
      Varejo
    </VLabel>

    <div class="position-relative">
      <VSwitch
        id="pricing-plan-toggle"
        v-model="annualMonthlyPlanPriceToggler"
        label="Atacado"
      />

      <div class="save-upto-chip position-absolute align-center d-none d-md-flex gap-1">
        <VIcon
          icon="tabler-corner-left-down"
          class="flip-in-rtl"
        />
        <VChip
          label
          color="primary"
        >
          20% de desconto
        </VChip>
      </div>
    </div>
  </div>

  <!-- SECTION pricing plans -->
  <VRow>
    <VCol
      v-for="plan in pricingPlans"
      :key="plan.logo"
      v-bind="props"
      cols="12"
    >
      <!-- 👉  Card -->
      <VCard
        flat
        border
        :class="plan.isPopular ? 'border-primary border-opacity-100' : ''"
      >
        <VCardText
          style="height: 4.125rem;"
          class="text-end"
        >
          <!-- 👉 Popular -->
          <VChip
            v-show="plan.isPopular"
            label
            color="primary"
            size="small"
          >
            Popular
          </VChip>
        </VCardText>

        <!-- 👉 Plan logo -->
        <VCardText class="text-center">
          <VImg
            :height="140"
            :src="plan.logo"
            class="mx-auto mb-5"
          />

          <!-- 👉 Plan name -->
          <h5 class="text-h5 mb-2">
            {{ plan.name }}
          </h5>
          <p class="mb-0">
            {{ plan.tagLine }}
          </p>
        </VCardText>

        <!-- 👉 Plan price  -->
        <VCardText class="position-relative text-center">
          <div class="d-flex justify-center align-center">
            <sup class="text-sm font-weight-medium me-1">YES</sup>
            <h1 class="text-5xl font-weight-medium text-primary">
              {{ annualMonthlyPlanPriceToggler ? Math.floor(Number(plan.yearlyPrice) / 10) : plan.monthlyPrice }}
            </h1>
            <sub class="text-sm font-weight-medium ms-1 mt-4">/máquina</sub>
          </div>

          <!-- 👉 Annual Price -->
          <span
            v-show="annualMonthlyPlanPriceToggler"
            class="position-absolute text-caption font-weight-medium mt-1"
            style="inset-inline: 0;"
          >
            {{ plan.yearlyPrice === 0 ? 'free' : `YES ${plan.yearlyPrice} /10 máquinas` }}
          </span>
        </VCardText>

        <!-- 👉 Plan features -->
        <VCardText class="mt-5">
          <VList class="card-list">
            <VListItem
              v-for="feature in plan.features"
              :key="feature"
            >
              <template #prepend>
                <VIcon
                  :size="14"
                  icon="tabler-circle"
                  class="me-3"
                />
              </template>

              <VListItemTitle>
                {{ feature }}
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>

        <VCardText
          class="text-center"
        >
          <!-- 👉 Disponible -->
          <VChip
            label
            :color="plan.disponible > 0 ? 'success' : 'error'"
            size="small"
          >
            <span v-if="plan.disponible > 0">{{ plan.disponible }} máquinas disponíveis</span>
            <span v-else>Esgotado!</span>
          </VChip>
        </VCardText>

        <!-- 👉 Plan actions -->
        <VCardActions>
          <VBtn
            block
            :color="plan.current ? 'success' : 'primary'"
            :variant="plan.isPopular ? 'elevated' : 'tonal'"
          >
            {{ plan.yearlyPrice === 0 ? 'Your Current Plan' : 'Comprar' }}
          </VBtn>
        </VCardActions>
      </VCard>
    </VCol>
  </VRow>
  <!-- !SECTION  -->
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.75rem;
}

.save-upto-chip {
  inset-block-start: -1.5rem;
  inset-inline-end: -7rem;
}
</style>

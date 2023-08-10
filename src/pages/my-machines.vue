<script setup>
const userListMeta = [
  {
    icon: 'tabler-user',
    color: 'primary',
    title: 'Minerando',
    stats: '5',
    percentage: 50,
    subtitle: 'Essas máquinas estão produzindo mais tokens YES para você',
  },
  {
    icon: 'tabler-user-plus',
    color: 'error',
    title: 'Precisa de reparos',
    stats: '1',
    percentage: 10,
    subtitle: 'Essas máquinas estão defeituosas e precisam de reparos',
  },
  {
    icon: 'tabler-user-check',
    color: 'success',
    title: 'Precisa de energia',
    stats: '3',
    percentage: 30,
    subtitle: 'Essas máquinas precisam de energia para continuar operando',
  },
  {
    icon: 'tabler-user-exclamation',
    color: 'warning',
    title: 'Coleta disponível',
    stats: '1',
    percentage: 10,
    subtitle: 'Você já pode coletar os tokens minerados por essas máquinas',
  },
]

const currentActiveTab = ref('New')

const orders = [
  {
    tabName: 'Minerando',
    timeline1: [
      {
        icon: 'tabler-circle-check',
        type: 'SENDER',
        name: 'Myrtle Ullrich',
        address: '101 Boulder, California(CA), 95959',
      },
      {
        icon: 'tabler-map-pin',
        type: 'RECEIVER',
        name: 'Barry Schowalter',
        address: '939 Orange, California(CA),92118',
      },
    ],
    timeline2: [
      {
        icon: 'tabler-circle-check',
        type: 'SENDER',
        name: 'Veronica Herman',
        address: '162 Windsor, California(CA), 95492',
      },
      {
        icon: 'tabler-map-pin',
        type: 'RECEIVER',
        name: 'Helen Jacobs',
        address: '487 Sunset, California(CA), 94043',
      },
    ],
  },
  {
    tabName: 'Precisa de reparos',
    timeline1: [
      {
        icon: 'tabler-circle-check',
        type: 'SENDER',
        name: 'Barry Schowalter',
        address: '939 Orange, California(CA),92118',
      },
      {
        icon: 'tabler-map-pin',
        type: 'RECEIVER',
        name: 'Myrtle Ullrich',
        address: '101 Boulder, California(CA), 95959',
      },
    ],
    timeline2: [
      {
        icon: 'tabler-circle-check',
        type: 'SENDER',
        name: 'Veronica Herman',
        address: '162 Windsor, California(CA), 95492',
      },
      {
        icon: 'tabler-map-pin',
        type: 'RECEIVER',
        name: 'Helen Jacobs',
        address: '487 Sunset, California(CA), 94043',
      },
    ],
  },
  {
    tabName: 'Precisa de energia',
    timeline1: [
      {
        icon: 'tabler-circle-check',
        type: 'SENDER',
        name: 'Veronica Herman',
        address: '101 Boulder, California(CA), 95959',
      },
      {
        icon: 'tabler-map-pin',
        type: 'RECEIVER',
        name: 'Barry Schowalter',
        address: '939 Orange, California(CA),92118',
      },
    ],
    timeline2: [
      {
        icon: 'tabler-circle-check',
        type: 'SENDER',
        name: 'Myrtle Ullrich',
        address: '162 Windsor, California(CA), 95492',
      },
      {
        icon: 'tabler-map-pin',
        type: 'RECEIVER',
        name: 'Helen Jacobs',
        address: '487 Sunset, California(CA), 94043',
      },
    ],
  },
  {
    tabName: 'Coleta disponível',
    timeline1: [
      {
        icon: 'tabler-circle-check',
        type: 'SENDER',
        name: 'Veronica Herman',
        address: '101 Boulder, California(CA), 95959',
      },
      {
        icon: 'tabler-map-pin',
        type: 'RECEIVER',
        name: 'Barry Schowalter',
        address: '939 Orange, California(CA),92118',
      },
    ],
    timeline2: [
      {
        icon: 'tabler-circle-check',
        type: 'SENDER',
        name: 'Myrtle Ullrich',
        address: '162 Windsor, California(CA), 95492',
      },
      {
        icon: 'tabler-map-pin',
        type: 'RECEIVER',
        name: 'Helen Jacobs',
        address: '487 Sunset, California(CA), 94043',
      },
    ],
  },
]

import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { hexToRgb } from '@layouts/utils'

const vuetifyTheme = useTheme()

const series = [{
  data: [
    40,
    65,
    50,
  ],
}]

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables
  
  return {
    chart: {
      parentHeightOffset: 0,
      type: 'bar',
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        barHeight: '60%',
        columnWidth: '38%',
        startingShape: 'rounded',
        endingShape: 'rounded',
        borderRadius: 4,
        distributed: true,
      },
    },
    grid: {
      show: false,
      padding: {
        top: -30,
        bottom: 0,
        left: -10,
        right: -10,
      },
    },
    colors: [
      `rgba(${ hexToRgb(currentTheme.warning) },${ variableTheme['pressed-opacity'] })`,
      `rgba(${ hexToRgb(currentTheme.error) },${ variableTheme['pressed-opacity'] })`,      
      `rgba(${ hexToRgb(currentTheme.success) },${ variableTheme['pressed-opacity'] })`,
    ],
    dataLabels: { enabled: false },
    legend: { show: false },
    xaxis: {
      categories: [
        'Energia',
        'Reparo',
        'Recompensa',
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: `rgba(${ hexToRgb(currentTheme['on-surface']) },${ variableTheme['disabled-opacity'] })`,
          fontSize: '11px',
          fontFamily: 'Public Sans',
        },
      },
    },
    yaxis: { labels: { show: false } },
    tooltip: { enabled: false },
    responsive: [{
      breakpoint: 1025,
      options: { chart: { height: 199 } },
    }],
  }
})

const earningsReports = [
  {
    color: 'success',
    icon: 'tabler-currency-dollar',
    title: 'Recompensa',
    amount: '105 YES',
    progress: '55',
  },
  {
    color: 'warning',
    icon: 'tabler-chart-pie-2',
    title: 'Energia',
    amount: '50 YES',
    progress: '25',
  },
  {
    color: 'error',
    icon: 'tabler-brand-paypal',
    title: 'Reparo',
    amount: '188 YES',
    progress: '65',
  },
]
</script>

<template>
  <VRow>
    <VCol
      v-for="meta in userListMeta"
      :key="meta.title"
      cols="12"
      sm="6"
      lg="3"
    >
      <VCard>
        <VCardText class="d-flex justify-space-between">
          <div>
            <span>{{ meta.title }}</span>
            <div class="d-flex align-center gap-2 my-1">
              <h6 class="text-h6">
                {{ meta.stats }}
              </h6>
              <span :class="meta.percentage > 0 ? 'text-success' : 'text-error'">({{ meta.percentage }}%)</span>
            </div>
            <span>{{ meta.subtitle }}</span>
          </div>

          <VAvatar
            rounded
            variant="tonal"
            :color="meta.color"
            :icon="meta.icon"
          />
        </VCardText>
      </VCard>
    </VCol>
    <VCol>
      <VCard
        title="Minhas Máquinas"
        subtitle="Você possui 10 máquinas de mineração"
      >
        <VTabs
          v-model="currentActiveTab"
          grow
        >
          <VTab
            v-for="order in orders"
            :key="order.tabName"
            :value="order.tabName"
          >
            {{ order.tabName }}
          </VTab>
        </VTabs>
        <VDivider />

        <VCardText>
          <VWindow
            v-model="currentActiveTab"
            class="disable-tab-transition"
          >
            <VWindowItem
              v-for="order in orders"
              :key="order.tabName"
              :value="order.tabName"
            >
              <VRow>
                <VCol
                  v-for="meta in userListMeta"
                  :key="meta.title"
                  cols="12"
                  sm="6"
                >
                  <VCard>
                    <VCardItem class="pb-sm-0">
                      <VCardTitle>PowerMine</VCardTitle>
                      <VCardSubtitle>Potencializando sua jornada cripto.</VCardSubtitle>
                    </VCardItem>

                    <VCardText>
                      <VRow>
                        <VCol
                          cols="12"
                          sm="5"
                          class="d-flex flex-column align-self-end"
                        >
                          <div class="d-flex align-center gap-2 mb-2 pb-1 flex-wrap">
                            <h4 class="text-2xl font-weight-semibold">
                              -600 YES
                            </h4>
                            <VChip
                              label
                              color="success"
                            >
                              Nível 1
                            </VChip>
                          </div>

                          <p class="text-xs">
                            Operando há <span class="text-warning">120 dias</span>
                          </p>
                          <p class="text-xs">
                            ID: <span class="text-warning">xxxxxxxxxxxxxxxxx</span>
                          </p>
                          <p class="text-xs">
                            Proprietário: <span class="text-warning">0x961...1a44</span>
                          </p>
                        </VCol>

                        <VCol
                          cols="12"
                          sm="7"
                          class="pt-0"
                        >
                          <VueApexCharts
                            :options="chartOptions"
                            :series="series"
                            height="220"
                          />
                        </VCol>
                      </VRow>

                      <div class="border rounded mt-3 pa-4">
                        <VRow>
                          <VCol
                            v-for="report in earningsReports"
                            :key="report.title"
                            cols="12"
                            sm="4"
                          >
                            <div class="d-flex align-center">
                              <VAvatar
                                rounded
                                size="30"
                                :color="report.color"
                                variant="tonal"
                                class="me-2"
                              >
                                <VIcon :icon="report.icon" />
                              </VAvatar>

                              <h6 class="text-base font-weight-medium">
                                {{ report.title }}
                              </h6>
                            </div>
                            <h6 class="text-h6 my-3">
                              {{ report.amount }}
                            </h6>
                            <VProgressLinear
                              :model-value="report.progress"
                              :color="report.color"
                              height="8"
                              rounded
                              rounded-bar
                            />
                          </VCol>
                        </VRow>
                      </div>    
                      <VBtn
                        block
                        class="mt-6"
                        color="success"
                      >
                        coletar recompensa
                      </VBtn>                  
                    </VCardText>
                  </VCard>
                </VCol>
              </VRow>
            </VWindowItem>
          </VWindow>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
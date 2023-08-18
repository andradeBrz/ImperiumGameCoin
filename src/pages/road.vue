<script setup>
import RoadTruckCard from '@/components/RoadTruckCard.vue'

import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { ref } from "vue"


const userStore = useUserStore()

//Import refs
const {
	userTrucks,
	  needRepairTrucks,
	needFuelTrucks,
	travelingTrucks,
} = storeToRefs(userStore)

const userListMeta = [
	{
		icon: 'tabler-user',
		color: 'primary',
		title: 'Rodando',
		stats: '5',
		percentage: 50,
		subtitle: 'Esses caminhões estão rodando.',
	},
	{
		icon: 'tabler-user-plus',
		color: 'error',
		title: 'Precisa de reparos',
		stats: '1',
		percentage: 10,
		subtitle: 'Esses caminhões estão quebrados e precisam de reparos.',
	},
	{
		icon: 'tabler-user-check',
		color: 'success',
		title: 'Precisa de gasolina',
		stats: '3',
		percentage: 30,
		subtitle: 'Esses caminhões precisam de gasolina.',
	},

]

let tabs = ref([
	{
		tabName: 'Rodando',
		content: travelingTrucks.value
	},
	{
		tabName: 'Precisa de reparos',
		content: needRepairTrucks.value,
	},
	{
		tabName: 'Precisa de gasolina',
		content: needFuelTrucks.value,
	},
	{
		tabName: 'Chegou ao destino',
		content: [],
	},
])

const earningsReports = [
	{
		color: 'success',
		icon: 'tabler-chart-pie-2',
		title: 'Duração da viagem',
		amount: '3 dias',
		progress: '55',
		name: 'travelTime'
	},
	{
		color: 'warning',
		icon: 'tabler-gas-station',
		title: 'Gasolina restante',
		amount: '50 IGC',
		progress: '25',
		name: 'fuelTime'
	},
	{
		color: 'error',
		icon: 'tabler-tool',
		title: 'Duração até o próximo reparo',
		amount: '188 IGC',
		progress: '65',
		name: 'repairTime'
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
        title="Estrada"
        subtitle="Você possui 11 caminhões"
      >
        <VTabs
          v-model="currentActiveTab"
          grow
        >
          <VTab
            v-for="tab in tabs"
            :key="tab.tabName"
            :value="tab.tabName"
          >
            {{ tab.tabName }}
          </VTab>
        </VTabs>
        <VDivider />

        <VCardText>
          <VWindow
            v-model="currentActiveTab"
            class="disable-tab-transition"
          >
            <VWindowItem
              v-for="tab in tabs"
              :key="tab.content"
              :value="tab.tabName"
            >
              <VRow>
                <pre>
                  {{ tab.content }}
                </pre>
                <VCol
                  v-for="truck in tab.content"
                  :key="truck.needRepair"
                  cols="12"
                  sm="6"
                >
                  <RoadTruckCard
                    :truck="truck"
                    :reports="earningsReports" 
                  />
                </VCol>
              </VRow>
            </VWindowItem>
          </VWindow>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
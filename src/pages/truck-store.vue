<script setup>
import { ref } from 'vue'
import TruckCard from '../components/TruckCard.vue'
import common from '../assets/game-img/NFT/common-1.PNG'

const trucks = ref([
	{
		name: 'Common',
		cost: 100,
		fuelTime: 9,
		repairTime: 150,
		harvestTime: 10, 
		image: "@/assets/game-img/NFT/common-1.PNG"
	},
	{
		name: 'Rare',
		cost: 250,
		fuelTime: 7,
		repairTime: 144,
		harvestTime: 8, 
		image: "@/assets/game-img/NFT/rare-1.PNG"
	},
	{
		name: 'Epic',
		cost: 600,
		fuelTime: 6,
		repairTime: 114,
		harvestTime: 7, 
		image: "@/assets/game-img/NFT/epic-1.PNG"
	},
])
</script>

<template>
  <VRow>
    <VCol
      cols="6"
    >
      <TruckCard
        v-for="truck in trucks"
        :key="truck.name"
        :truck="truck"
      />
    </VCol>
  </VRow>
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

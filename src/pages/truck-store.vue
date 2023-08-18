<script setup>
import { ref } from 'vue'
import data from '../assets/trucks'
import StoreTruckCard from '../components/StoreTruckCard.vue'
</script>

<template>
  <VRow>
    <VCol
      v-for="truck in data.storeTrucks"
      :key="truck.name"
      cols="6"
    >
      <StoreTruckCard
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

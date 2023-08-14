<template>
  <VCard>
    <VCardItem class="pb-sm-0">
      <VImg
        :height="140"
        class="mx-auto mb-5"
        :src="truck.image"
      />
    </VCardItem>
    <VCardText class="d-flex justify-space-between flex-column ">
      <VCardTitle class="text-center xxlarge">
        {{ truck.name }}
      </VCardTitle>
      <VCardSubtitle>{{ truck.description }}</VCardSubtitle>
      <div>
        <div class="d-flex flex-row justify-space-between">
          <span class="d-flex font-weight-bold font-size-larger ">Cost: </span> 
          <span class="d-flex font-weight-bold font-size-larger"> IGC {{ truck.cost }} </span>
        </div>
        <div class="d-flex flex-row justify-space-between">
          <span class="d-flex font-weight-bold font-size-larger">Fuel time: </span>
          <span class="d-flex font-weight-bold font-size-larger"> {{ truck.fuelTime }} days </span>
        </div>
        <div class="d-flex flex-row justify-center">
          <VBtn
            class="mt-5 d-flex w-80"
            rounded="lg"
            color="primary"
          >
            Comprar
          </VBtn>
        </div>
      </div>
    </VCardText>
  </VCard>
</template>

<script setup>
defineProps({
	truck: {
		type: Object,
		required: true,
	},
})
</script>

<style scoped>
.xxlarge{
  font-size: 1.8rem;
}
</style>

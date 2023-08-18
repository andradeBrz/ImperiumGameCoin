<template>
  <VCard>
    <VCardItem class="pb-sm-0">
      <VCardTitle>
        {{ truck.name }}
      </VCardTitle>
    </VCardItem>

    <VCardText>
      <VRow>
        <VCol
          cols="12"
          sm="5"
          class="d-flex flex-column align-self-end"
        >
          <div class="d-flex align-center gap-2 mb-2 pb-1 flex-wrap">
            <VChip
              label
              color="success"
            >
              Nível {{ truck.level }}
            </VChip>
          </div>

          <p class="text-xs">
            Viajando a <span class="text-warning">15 dias</span>
          </p>
        </VCol>

        <VCol
          cols="12"
          sm="7"
          class="pt-0"
        >
          <VImg
            :height="140"
            class="mx-auto mb-5"
            :src="truck.image"
          />
        </VCol>
      </VRow>

      <div class="mt-3 pa-4">
        <VRow
          v-for="report in reports"
          :key="report.title"
        >
          <div class="d-flex align-center mt-6 mb-2">
            <VAvatar
              rounded
              size="30"
              :color="report.color"
              variant="tonal"
              class="me-2"
            >
              <VIcon :icon="report.icon" />
            </VAvatar>

            <h6 class="text-base font-weight-medium ">
              {{ report.title }} - {{ truck[report.name] }} sec
            </h6>
          </div>
          <VProgressLinear
            :model-value="truck[report.name]"
            :color="report.color"
            height="8"
            rounded
            rounded-bar
          />
        </VRow>
      </div>    
      <VBtn
        v-if="truck.travelTime == 0"
        block
        class="mt-6"
        color="success"
      >
        Entregar carga
      </VBtn>                  
      <VBtn
        v-if="truck.repairTime == 0"							  
        block
        class="mt-6"
        color="success"
      >
        Consertar caminhão
      </VBtn>                  
      <VBtn
        v-if="truck.fuelTime == 0"
        block
        class="mt-6"
        color="success"
      >
        Encher tanque
      </VBtn>                  
    </VCardText>
  </VCard>
</template>

<script setup>
defineProps({
	truck: {
		type: Object,
		required: true,
	},
	reports: {
		type: Array,
		required: true,
	},
})

const needsRepair = computed(() => {
	return truck.repairTime > 0
})

const needsFuel = computed(() => {
	return truck.fuelTime > 0
})  

const needsTravel = computed(() => {
	return truck.travelTime > 0
})
</script>

<style scoped>
.xxlarge{
  font-size: 1.8rem;
}
</style>

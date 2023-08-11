<template>
  <VCard>
    <VCardItem class="pb-sm-0">
      <VCardTitle>{{ truck.title }}</VCardTitle>
      <VCardSubtitle>{{ truck.description }}</VCardSubtitle>
    </VCardItem>
    <VCardText class="d-flex justify-space-between">
      <div>
        <div class="d-flex align-center gap-2 my-1">
          <h6 class="text-h6">
            {{ truck.type }}
          </h6>
          <span>({{ truck.cost }}%)</span>
        </div>
      </div>
      <VAvatar
        rounded
        variant="tonal"
        color="red"
      />
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

<style lang="scss">

</style>

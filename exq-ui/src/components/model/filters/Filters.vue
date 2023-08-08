<script setup lang="ts">
import { useFilterStore } from '@/stores/filters';


interface Props {
    modelId : number
}
const props = defineProps<Props>()

const filterStore = useFilterStore()
const filters = filterStore.filters

</script>

<template>

</template>

<style scoped>

</style>
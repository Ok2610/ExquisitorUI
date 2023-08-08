<script setup lang="ts">
import { useFilterStore } from '@/stores/filters';


interface Props {
    modelId : number
}
const props = defineProps<Props>()

const filterStore = useFilterStore()

</script>

<template>

</template>

<style scoped>

</style>
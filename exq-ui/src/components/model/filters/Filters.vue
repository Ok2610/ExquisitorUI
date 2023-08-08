<script setup lang="ts">
import { useFilterStore } from '@/stores/filters';
import { reactive } from 'vue';


interface Props {
    modelId : number
}
const props = defineProps<Props>()

const filterStore = useFilterStore()
const filters = filterStore.filters

const collections = reactive(new Set<string>())
filters.forEach((v,i,arr) => { collections.add(v.collectionId) })

</script>

<template>

</template>

<style scoped>

</style>
<script setup lang="ts">
import { useModelStore } from '@/stores/model';
import type Model from '@/types/model';
import { computed } from 'vue';


interface Props {
    modelId: number 
}
const props = defineProps<Props>()

const modelStore = useModelStore()
const model = computed(() => modelStore.getModel(props.modelId))

</script>

<template>

</template>

<style scoped>

</style>
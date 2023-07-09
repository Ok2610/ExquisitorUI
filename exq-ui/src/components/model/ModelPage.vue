<script setup lang="ts">
import type Model from '@/types/model';
import { useModelStore } from '@/stores/model';
import { computed } from 'vue';

interface Props { 
    modelId : number
}
const props = defineProps<Props>()

const modelStore = useModelStore()
const model = computed(() => modelStore.getModel(props.modelId))

function testAction() {
    console.log('testAction');
    return 0;
}

</script>

<template>
    <v-container>
        <v-text-field 
         variant="outlined"
         append-inner-icon="mdi-square-edit-outline"
         v-model="model.name"
         @click:append-inner=""
         >
        </v-text-field>
    </v-container>
    <v-container class="d-block">
        <v-btn @click="testAction">
           TEST
            <v-tooltip 
             activator="parent" 
             location="bottom"
             open-delay="500"
             >
                Test tooltip text
            </v-tooltip>
        </v-btn>
    </v-container>
</template>

<style scoped>

</style>
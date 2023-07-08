<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';

import { initExquisitor } from '@/services/ExquisitorAPI'
import { useModelStore } from '@/stores/model';
import { storeToRefs } from 'pinia';

import type Model from '@/types/model';

// interface Props { }
// defineProps<Props>()

const exqStatus = await initExquisitor();

if (!exqStatus) {
    console.log('FATAL ERROR: Failed to initialize Exqusitor!')    
}

const modelStore = useModelStore()
const models = computed(() => modelStore.models)
const addModel = computed(() => modelStore.addModel)
function removeModel(model : Model) {
    modelStore.removeModel(model)
} 


// const activeModel = ref(modelStore.models[0].id)
// function changeModel (mid: number) {
//     activeModel.value = mid
// }

// const test = storeToRefs(modelStore).models
const tabs = computed(() => models.value.length)
console.log(tabs.value)
// const length = tab.value==0
</script>

<template>
    <template v-if="exqStatus">
        <v-card id="panel">
            <v-tabs>
                <v-tab 
                 v-for="model in models" 
                 :key="model.id" 
                 :value="'tab-'+model.id">
                    {{ model.name }}
                    <v-divider class="mx-1" horizontal /> 
                    <v-btn @click="removeModel(model)"></v-btn>
                </v-tab>
            </v-tabs>
            <v-card-text class="text-center">
                <v-btn color="red" @click="addModel" icon={mdi-plus} /> 
            </v-card-text>
        </v-card>
        <!-- <div v-for="m in modelStore"></div> -->
    </template>
    <template v-else>
        <h1>FAILED TO LOAD EXQUISITOR</h1>
    </template>
</template>

<style scoped>

</style>
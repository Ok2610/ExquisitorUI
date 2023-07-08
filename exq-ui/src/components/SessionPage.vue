<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';

import { initExquisitor } from '@/services/ExquisitorAPI'
import { useModelStore } from '@/stores/model';

import type Model from '@/types/model';
import ModelPage from '@/components/model/ModelPage.vue'

// interface Props { }
// defineProps<Props>()

const exqStatus = await initExquisitor();
if (!exqStatus) {
    console.log('FATAL ERROR: Failed to initialize Exqusitor!')    
}

// Model store
const modelStore = useModelStore()
const models = computed(() => modelStore.models)
const addModel = computed(() => modelStore.addModel)
function removeModel(model : Model) {
    modelStore.removeModel(model)
} 
const activeModel = ref(models.value[0])

// Window size
// const winHeight = reactive({ height: window.innerHeight })
const winWidth = { width: window.innerWidth+'px', minWidth: window.innerWidth+'px' }
// console.log(winHeight.height, winWidth.width)

// Misc
// const activeModel = ref(modelStore.models[0].id)
// function changeModel (mid: number) {
//     activeModel.value = mid
// }

</script>

<template>
    <template v-if="exqStatus">
        <v-toolbar 
         id="panel" 
         class="bg-amber-darken-3"
         density="compact"
         >
            <v-tabs class="mr-2" v-model="activeModel">
                <v-tab 
                 v-for="m in models" 
                 :key="m.id" 
                 :value="m"
                 color=""
                 >
                    {{ m.name }}
                    <v-divider class="mx-1" /> 
                    <v-btn @click="removeModel(m)" class="v-btn--flat" density="compact" icon="mdi-close" />
                </v-tab>
            </v-tabs>
            <div>
                <v-btn color="black" style="background-color: rgb(228, 211, 187);" density="compact" @click="addModel" icon="mdi-plus" />
            </div>
        </v-toolbar>
        <ModelPage :currModel=activeModel />
    </template>
    <template v-else>
        <h1>FAILED TO LOAD EXQUISITOR</h1>
    </template>
</template>

<style scoped>
#panel {
    width: v-bind('winWidth.width');
}
.no-bg {
    background: transparent;
    border: none;
}
</style>
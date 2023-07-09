<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';

import { initExquisitor } from '@/services/ExquisitorAPI'
import { useModelStore } from '@/stores/model';

import type Model from '@/types/model';
import ModelPage from '@/components/model/ModelPage.vue'

import DeleteDialog from '@/components/general/DeleteDialog.vue'

// interface Props { }
// defineProps<Props>()

const exqStatus = await initExquisitor();
if (!exqStatus) {
    console.log('FATAL ERROR: Failed to initialize Exqusitor!')    
}

// Dialogs
const closeDeleteDialog = ref(false)

// Model store
const modelStore = useModelStore()
const models = computed(() => modelStore.models)
const addModel = computed(() => modelStore.addModel)
function deleteModel(model : Model) {
    modelStore.deleteModel(model)
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
                 >
                    {{ m.name }}
                    <v-divider class="no-bg clr-transparent" :thickness="5" vertical /> 
                    <DeleteDialog
                     :id="m.id"
                     :name="m.name"
                     title="Model"
                     :confirm="deleteModel"
                     :par="m"
                     />
                </v-tab>
            </v-tabs>
            <div class="mr-2">
                <v-btn 
                 color="black" 
                 style="background-color: white;" 
                 density="compact" 
                 @click="addModel" 
                 icon="mdi-plus" />
            </div>
        </v-toolbar>

        <ModelPage :modelId=activeModel.id />
    </template>
    <template v-else>
        <h1>FAILED TO LOAD EXQUISITOR</h1>
    </template>
</template>

<style scoped>
#panel {
    width: v-bind('winWidth.width');
}
</style>
<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';

import { initExquisitor } from '@/services/ExquisitorAPI'
import { useModelStore } from '@/stores/model';

import type Model from '@/types/model';
import ModelPage from '@/components/model/ModelPage.vue'

import DeleteDialog from '@/components/general/DeleteDialog.vue'
import SettingsForm from './model/SettingsForm.vue';

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
function deleteModel(model : Model) {
    modelStore.deleteModel(model)
} 

function changeModelName(newName: string) {
    modelStore.changeName(activeModel.value, newName)
}

const activeModel = ref(models.value[0])

// Window size
// const winHeight = reactive({ height: window.innerHeight })
const winWidth = { width: window.innerWidth+'px', minWidth: window.innerWidth+'px' }
// console.log(winHeight.height, winWidth.width)

</script>

<template>
    <template v-if="exqStatus">
        <v-toolbar 
         class="bg-amber-darken-3 panel"
         density="compact"
         >
            <v-tabs 
             class="mr-2" 
             v-model="activeModel"
             >
                <v-tab 
                 v-for="m in models" 
                 :key="m.id" 
                 :value="m"
                 >
                    {{ m.name }}
                    <v-divider class="no-bg clr-transparent" :thickness="5" vertical /> 
                    <delete-dialog
                     :id="m.id"
                     :name="m.name"
                     title="Model"
                     @submit="deleteModel(m)"
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
            <v-spacer></v-spacer>
            <template
             v-for="m in models" 
             >
                <settings-form v-if="activeModel.id === m.id" :modelId="m.id" />
            </template>
        </v-toolbar>

        <v-window v-model="activeModel">
            <template
             v-for="m in models" 
             >
                <model-page v-if="activeModel.id === m.id" :model-id="m.id" />
            </template>
        </v-window>
    </template>
    <template v-else>
        <h1>FAILED TO LOAD EXQUISITOR</h1>
    </template>
</template>

<style scoped>
.panel {
    width: v-bind('winWidth.width');
    max-width: v-bind('winWidth.width');
}
</style>
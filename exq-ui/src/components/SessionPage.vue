<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';

import { initExquisitor } from '@/services/MockExquisitorAPI'
import { useModelStore } from '@/stores/models';

import type Model from '@/types/model';
import ModelPage from '@/components/model/ModelPage.vue'

import DeleteDialog from '@/components/general/DeleteDialog.vue'
import SettingsForm from './model/SettingsForm.vue';
import { onMounted } from 'vue';

// interface Props { }
// defineProps<Props>()

const exqSession = await initExquisitor();

// Model store
const modelStore = useModelStore()

const models = computed(() => modelStore.models)
if (exqSession.success) {
    await modelStore.addModel(exqSession.session)
}

const activeModel = ref(models.value[0])

async function addModel (name?: string) {
    await modelStore.addModel(exqSession.session, name)
    activeModel.value = models.value[models.value.length - 1]
}
async function deleteModel(model: Model) {
    if (activeModel.value.id === model.id) {
        let index = models.value.findIndex(e => e.id === model.id)
        activeModel.value = models.value[index-1]
    }
    await modelStore.deleteModel(exqSession.session, model)
} 

// Window size
// const winHeight = reactive({ height: window.innerHeight })
const winWidth = { width: window.innerWidth+'px', minWidth: window.innerWidth+'px' }
// console.log(winHeight.height, winWidth.width)

</script>

<template>
    <template v-if="exqSession.success">
        <v-layout class="panel">
            <v-app-bar
             class="bg-amber-darken-3 panel"
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
                    <settings-form v-if="activeModel.id === m.id" :current-model="m" />
                </template>
            </v-app-bar>

            <v-main v-model="activeModel">
                <template
                 v-for="m in models" 
                 >
                    <model-page v-if="activeModel.id === m.id" :model-id="m.id"/>
                </template>
            </v-main>
        </v-layout>
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
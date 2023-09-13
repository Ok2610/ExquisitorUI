<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import Grid from './Grid.vue';
import { useModelStore } from '@/stores/models';
import LeftPanel from './LeftPanel.vue';
import RightPanel from './RightPanel.vue';

interface Props { 
    modelId : number
}
const modelProps = defineProps<Props>()

const modelStore = useModelStore()
const model = computed(() => modelStore.getModel(modelProps.modelId))

const update = ref(false)

function updateGrid() {
    update.value = false
    // TODO: CALL ExquisitorAPI to train and get new suggestions
}

</script>

<template>
    <left-panel :model-id="modelId" />
    <v-container class="d-block">
        <grid v-for="grp in model.grid" 
         :model-id="modelId" 
         :group="grp" 
         @change="update=true"
        />
        <v-sheet
         class="bottom-panel mb-5 pa-1"
         :elevation="24"
         location="bottom center"
         color="black"
         rounded
        >
            <v-btn
             size="x-large"
             class="flexcol"
             variant="plain"
             :style="{backgroundColor: update ? 'chartreuse' : 'black', color: update? 'black' : ''}"
             @click="updateGrid"
            >
                <v-icon>mdi-autorenew</v-icon>
                <span class="text-subtitle-2">UPDATE</span>
            </v-btn>
            <v-btn
             size="x-large"
             class="flexcol"
             variant="plain"
             :style="{backgroundColor: 'black'}"
             @click="updateGrid"
            >
                <v-icon>mdi-refresh</v-icon>
                <span class="text-subtitle-2">CLEAR</span>
            </v-btn>
        </v-sheet>
    </v-container>
    <right-panel :model-id="modelId" />
</template>

<style scoped>
.flexcol :deep(.v-btn__content) {
    flex-direction: column;
}
.bottom-panel {
    position: fixed;
    width: auto;
    text-align: center;
}
</style>
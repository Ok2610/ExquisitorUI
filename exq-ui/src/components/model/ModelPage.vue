<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import Grid from './Grid.vue';
import { useModelStore } from '@/stores/model';
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
        <grid v-for="grp in model.grid" :model-id="modelId" :group="grp" />
        <v-sheet
         class="bottom-panel mb-5"
         :elevation="24"
         theme="dark"
         location="bottom center"
         rounded
        >
            <v-btn
             size="x-large"
             variant="plain"
             :color="update ? 'teal' : 'white'"
             @click="updateGrid"
            >
                <v-icon>mdi-autorenew</v-icon>
            </v-btn>
        </v-sheet>
    </v-container>
    <right-panel :model-id="modelId" />
</template>

<style scoped>
.bottom-panel {
    position: fixed;
    width: 10%;
    text-align: center;
}
</style>
<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import Grid from './Grid.vue';
import { useModelStore } from '@/stores/model';
import LeftDrawer from './LeftDrawer.vue';
import RightDrawer from './RightDrawer.vue';

interface Props { 
    modelId : number
}
const modelProps = defineProps<Props>()

const modelStore = useModelStore()
const model = computed(() => modelStore.getModel(modelProps.modelId))


function testAction() {
    console.log('testAction');
    model.value.name = model.value.name+' hi'
    return 0;
}

</script>

<template>
    <left-drawer :model-id="modelId" />
    <v-container class="d-block">
        <grid v-for="grp in model.grid" :model-id="modelId" :group="grp" />
    </v-container>
    <right-drawer :model-id="modelId" />
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
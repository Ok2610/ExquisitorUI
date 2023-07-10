<script setup lang="ts">
import { useModelStore } from '@/stores/model';
import { useItemStore } from '@/stores/items';
import { ref, computed, reactive } from 'vue';

interface Props { 
    modelId : number
}
const props = defineProps<Props>()

const modelStore = useModelStore()
const model = computed(() => modelStore.getModel(props.modelId))

const itemStore = useItemStore()

function testAction() {
    console.log('testAction');
    model.value.name = model.value.name+' hi'
    return 0;
}

</script>

<template>
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
<script setup lang="ts">
import Grid from './Grid.vue';
import LeftPanel from './LeftPanel.vue';
import RightPanel from './RightPanel.vue';
import { ref, computed, reactive } from 'vue';
import { useModelStore } from '@/stores/models';
import { useItemStore } from '@/stores/items';
import { useSessionStore } from '@/stores/sessions';
import { ILSets } from '@/types/mediaitem';
import { provide } from 'vue';

interface Props { 
    modelId : number
}
const modelProps = defineProps<Props>()

const modelStore = useModelStore()
const model = computed(() => modelStore.getModel(modelProps.modelId))
const itemStore = useItemStore()
const session = useSessionStore().getSession

const updateButton = ref(false)

function replaceItem(id:number, grid:number) {
    updateButton.value = true
    // Get items from cache
    // TODO: Let server have a cache, collect 2 times requested n, 
    // and whenever we need to replace get from cache
    let n = 1;
    let pos = itemStore.getSetItems(model.value.id, ILSets.Positives).map((e,_) => e.id)
    let neg = itemStore.getSetItems(model.value.id, ILSets.Negatives).map((e,_) => e.id)
    let hist = itemStore.getSetItems(model.value.id, ILSets.History).map((e,_) => e.id)
    hist.push(...pos)
    hist.push(...neg)
    modelStore.getSuggestions({session: session, model: model.value.id, n: n, pos: pos, neg: neg, seen: hist}, grid, id)
}

function updateGrid() {
    updateButton.value = false
    // TODO: Make this getSuggestions for each group
    // Works since there is only one group
    let gridItems = model.value.grid[0].items.filter((el,_) => !itemStore.isItemInNeg(el, model.value.id) 
                                                               && !itemStore.isItemInPos(el, model.value.id))
    itemStore.addItemsToSet(gridItems, model.value.id, ILSets.History)
    let n = model.value.settings.groups[0].itemsToShow;
    let pos = itemStore.getSetItems(model.value.id, ILSets.Positives).map((e,_) => e.id)
    let neg = itemStore.getSetItems(model.value.id, ILSets.Negatives).map((e,_) => e.id)
    let hist = itemStore.getSetItems(model.value.id, ILSets.History).map((e,_) => e.id)
    hist.push(...pos)
    hist.push(...neg)
    // TODO: replace hardcoded value
    modelStore.getSuggestions({session: session, model: model.value.id, n: n, pos: pos, neg: neg, seen: hist}, 0)
}

function resetGrid() {
    modelStore.resetModel(model.value)
}

const itemHW = reactive({ maxHeight: (window.innerHeight * 0.25)+'px', maxWidth: (window.innerWidth * 0.3)+'px' })
provide('itemHW', itemHW)
</script>

<template>
    <left-panel :model-id="modelId" />
    <v-container class="d-block">
        <grid v-for="grp in model.grid" 
         :model-id="modelId" 
         :group="grp" 
         :group-index="model.grid.indexOf(grp)"
         @change="replaceItem"
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
             :style="{backgroundColor: updateButton ? 'chartreuse' : 'black', color: updateButton ? 'black' : ''}"
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
             @click="resetGrid"
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
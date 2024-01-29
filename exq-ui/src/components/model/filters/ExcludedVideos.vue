<script setup lang="ts">
import { ItemButton, type ItemButtons } from '@/types/mediaitem';
import { reactive, ref } from 'vue';
import Item from '@/components/model/Item.vue';
import { clearExcludedVideos, getExcludedVideos, } from '@/services/ExquisitorAPI';
import { useSessionStore } from '@/stores/sessions';


interface Props {
    modelId: number
    force: number
}
const props = defineProps<Props>()

const excludedItems: { items: number[] } = reactive({ items: [] })

const buttonSet = new Set<ItemButton>()
buttonSet.add(ItemButton.Pos)
buttonSet.add(ItemButton.Neg)
buttonSet.add(ItemButton.Sub)
const buttons : ItemButtons = { buttons: buttonSet }

const loading = ref(false)
const loaded = ref(false)

const session = useSessionStore().getSession

async function getExcludedVids() {
    excludedItems.items = await getExcludedVideos({session: session, model: props.modelId}).then(val => val.videos)
    console.log(excludedItems.items)
    loaded.value = true
}

async function clearExcluded() {
    await clearExcludedVideos({session: session, model: props.modelId, items: excludedItems.items})
            .then(() => excludedItems.items = [])
}

getExcludedVids()
</script>

<template>
    <!-- Button Sheet -->
    <v-sheet
     class="text-center pt-3 pb-3"
     color="orange-lighten-2"
    >
        <v-btn size="small" icon="mdi-close" @click="clearExcluded"></v-btn>
    </v-sheet>
    <!-- Result List -->
    <v-list v-model="loaded" :key="force">
        <v-list-item v-for="it in excludedItems.items">
            <item 
             :buttons="buttons" 
             :item-id="it"
             :model-id="modelId"
             :provided="false"
             :overlay="true"
            />
        </v-list-item>
    </v-list>
</template>

<style scoped>
.tooltip-opacity :deep(.v-overlay__content) {
  background: rgba(255, 255, 255, 0.856) !important;
}
</style>
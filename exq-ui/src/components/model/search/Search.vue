<script setup lang="ts">
import { useSearchStore } from '@/stores/search';
import { ItemButton, type ItemButtons } from '@/types/mediaitem';
import type { SearchResults } from '@/types/search';
import { storeToRefs } from 'pinia';
import { reactive, ref } from 'vue';
import Item from '@/components/model/Item.vue';
import { useItemStore } from '@/stores/items';


interface Props {
    modelId: number
}
const props = defineProps<Props>()

const searchResults : SearchResults = reactive({
    query: '',
    items: []
})

const { lastQuery } = storeToRefs(useSearchStore())
const { updateLastQuery, clearLastQuery } = useSearchStore()
const { fetchMediaItems } = useItemStore()

if (lastQuery.value.has(props.modelId)) {
    searchResults.query = lastQuery.value.get(props.modelId)!.query
    searchResults.items = lastQuery.value.get(props.modelId)!.items
}

const buttonSet = new Set<ItemButton>()
buttonSet.add(ItemButton.Pos)
buttonSet.add(ItemButton.Neg)
buttonSet.add(ItemButton.Sub)
const buttons : ItemButtons = { buttons: buttonSet }

const loaded = ref(false)
const loading = ref(false)

async function search() {
    loading.value = true
    // TODO: Call ExquisitorAPI search and update searchResults
    const apiResults : number[] = []
    searchResults.items = await fetchMediaItems(apiResults, props.modelId)
    updateLastQuery(props.modelId, searchResults)
    setTimeout(() => {
        loading.value = false
        loaded.value = true
    }, 2000)
}

function clearSearch() {
    searchResults.query = ''
    searchResults.items = []
    clearLastQuery(props.modelId)
}

</script>

<template>
    <!-- Button Sheet -->
    <v-sheet
     class="text-center pt-3 pb-3"
    >
        <v-btn 
         size="small"
         icon="mdi-open-in-new"
         disabled
        />
        <v-divider vertical thickness="10"/>
        <v-btn 
         size="small"
         icon="mdi-cog-outline"
         disabled
        />
        <v-divider vertical thickness="10"/>
        <v-tooltip
         class="tooltip-opacity"
         location="right"
         open-delay="250"
        >
            <template v-slot:activator="{ props }">
                <v-btn 
                 v-bind="props"
                 size="small"
                 icon="mdi-close"
                 @click="clearSearch"
                />
            </template>
            Clear Search
        </v-tooltip>
    </v-sheet>
    <!-- Search Bar -->
    <v-sheet>
        <v-text-field
         v-model="searchResults.query"
         label="Search..."
         density="compact"
         variant="solo"
         single-line
         hide-details
         :loading="loading"
         append-inner-icon="mdi-magnify"
         @click:append-inner="search"
         @keydown.enter="search"
        />
    </v-sheet>
    <!-- Result List -->
    <v-list v-model="loaded">
        <v-list-item v-for="it in searchResults.items">
            <item 
                :buttons="buttons" 
                :item-id="it.id"
                :model-id="modelId"
                :provided="false"
            />
        </v-list-item>
    </v-list>
</template>

<style scoped>
.tooltip-opacity :deep(.v-overlay__content) {
  background: rgba(255, 255, 255, 0.856) !important;
}
</style>
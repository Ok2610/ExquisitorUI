<script setup lang="ts">
import { useItemStore } from '@/stores/items'
import type { GridGroup } from '@/types/model'
import { computed, reactive } from 'vue'
import Item from '@/components/model/Item.vue'
import { type ItemButtons, ItemButton } from '@/types/mediaitem';

interface Props {
    modelId: number 
    group: GridGroup
}
const props = defineProps<Props>()

const itemStore = useItemStore()
const buttonSet = new Set<ItemButton>()
buttonSet.add(ItemButton.Pos)
buttonSet.add(ItemButton.Neg)
buttonSet.add(ItemButton.Ignore)
buttonSet.add(ItemButton.Sub)
const buttons : ItemButtons = { buttons: buttonSet }
async function getItems () {
    return await itemStore.getMediaItems(props.group.items, props.modelId)
}
const items = await getItems()

// TODO: Add to settings... Toggle for always update model or only when pressing update

</script>

<template>
    <v-row
     variant="outlined" 
     >
        <v-col 
         v-for="it in items"
         class="d-flex child-flex"
         cols="3"
         >
            <item 
             :buttons="buttons" 
             :item="it"
             :modelId="modelId"
            />
        </v-col>
    </v-row>
</template>

<style scoped>

</style>
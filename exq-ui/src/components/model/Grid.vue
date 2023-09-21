<script setup lang="ts">
import { useItemStore } from '@/stores/items'
import type { GridGroup } from '@/types/model'
import Item from '@/components/model/Item.vue'
import { type ItemButtons, ItemButton, ILSets, MediaType } from '@/types/mediaitem';
import { reactive } from 'vue';

interface Props {
    modelId: number 
    group: GridGroup
    groupIndex: number
}
const props = defineProps<Props>()

const buttonSet = new Set<ItemButton>()
buttonSet.add(ItemButton.Pos)
buttonSet.add(ItemButton.Neg)
buttonSet.add(ItemButton.Ignore)
buttonSet.add(ItemButton.Sub)
const buttons : ItemButtons = { buttons: buttonSet }

defineEmits<{
    (event: 'replace', id:number, grid:number): void
    (event: 'change'): void
}>()

// TODO: Add to settings... Toggle for always update model or only when pressing update
// const itemHW = reactive({ maxHeight: (window.innerHeight * 0.25)+'px', maxWidth: (window.innerWidth * 0.3)+'px' })
</script>

<template>
    <suspense>
    <v-row 
     variant="outlined" 
    >
        <v-col 
         v-for="i in group.items"
         :key="i"
         cols="3"
         >
            <item 
             :buttons="buttons" 
             :item-id="i"
             :model-id="modelId"
             :provided="false"
             @replace="$emit('replace', i, group.id)"
             @change="$emit('change')"
            />
        </v-col>
    </v-row>
    </suspense>
</template>

<style scoped>

</style>
<script setup lang="ts">
import { useItemStore } from '@/stores/items';
import type MediaItem from '@/types/mediaitem';
import { ItemButton, MediaType } from '@/types/mediaitem';
import { computed, reactive } from 'vue';

interface Props {
    item: MediaItem
    activator: boolean
}
defineProps<Props>()

const itemStore = useItemStore()
const isPos = computed(() => itemStore.isItemInPos)
const isNeg = computed(() => itemStore.isItemInNeg)
// const isHistory = computed(() => itemStore.isItemInHistory)
const isSubmitted = computed(() => itemStore.isItemInSubmitted)

// const details: ... = reactive({})
// async function getItemInfo() {
//     const details = await itemStore.getItemInfo(item.id)
//     details.
//     details.
//     details.
//     details.
// }
</script>

<template>
    <v-overlay 
     activator="parent"
     scroll-strategy="block"
     class="align-center justify-center"
     >
         <v-container>
            <v-sheet id="large-item-source">
                <!-- Image -->
                <v-img
                 v-if="item.mediaType === MediaType.Image"
                 :id="'itemSrc'+item.id"
                 :src="item.srcPath"
                />
                <!-- Video -->
            </v-sheet>
            <v-sheet id="item-details">
            </v-sheet>
        </v-container>
        <!-- TIMELINE GOES HERE -->
    </v-overlay>
</template>

<style scoped>

</style>
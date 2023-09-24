<script setup lang="ts">
import { useItemStore } from '@/stores/items';
import type MediaItem from '@/types/mediaitem';
import { ItemButton, MediaType, type ItemButtons, type Meta } from '@/types/mediaitem';
import { computed, reactive, ref } from 'vue';

interface Props {
    modelId: number
    item: MediaItem
    opened: boolean
}
const props = defineProps<Props>()

defineEmits(['closed'])

const showOverlay = props.opened

const itemStore = useItemStore()
const isPos = computed(() => itemStore.isItemInPos)
const isNeg = computed(() => itemStore.isItemInNeg)
const isHistory = computed(() => itemStore.isItemInHistory)
const isSubmitted = computed(() => itemStore.isItemInSubmitted)

const buttonSet = new Set<ItemButton>()
buttonSet.add(ItemButton.Pos)
buttonSet.add(ItemButton.Neg)
buttonSet.add(ItemButton.Sub)
const buttons : ItemButtons = { buttons: buttonSet }


const temp : MediaItem = reactive({id: -1, srcPath:'', thumbPath:''})
const details: Meta = reactive({
    nameValuePair: [['', ['']]],
    timelineN: 0,
    timelineRange: [-1,-1],
})

const itemIds : number[] = reactive([])
async function getItemInfo() {
    const resp = await itemStore.getItemInfo(props.item.id)
    details.nameValuePair = resp.nameValuePair
    details.timelineN = resp.timelineN
    details.timelineRange = resp.timelineRange
    for (let i = details.timelineRange[0]; i < details.timelineRange[1]; i++) {
        itemIds.push(i)
    }
}

if (props.opened) getItemInfo()
</script>

<template>
    <v-container class="d-flex">
        <v-sheet class="large-item-source">
            <!-- Image -->
            <v-img
             v-if="item.mediaType === MediaType.Image"
             :id="'itemSrc'+item.id"
             :src="item.srcPath"
            />
            <!-- Video -->
        </v-sheet>
        <v-card class="item-details">
            <v-card-text v-for="n in details.nameValuePair">
                {{ n[0] }}: {{ n[1] }}                    
            </v-card-text>
        </v-card>
    </v-container>
    <!-- TIMELINE GOES HERE -->
    <v-row>
        <v-col v-for="id in itemIds">
            <item
             :buttons="buttons" 
             :item-id="id"
             :model-id="modelId"
             :provided="false"
             @change="$emit('change')"
            />
        </v-col>
    </v-row>
</template>

<style scoped>
.large-item-source {
    width: 75%;
}
.item-details {
    background-color: azure;
    width: 25%;
}
</style>
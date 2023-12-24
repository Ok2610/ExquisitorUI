<script setup lang="ts">
import Item from '@/components/model/Item.vue'
import { getItem } from '@/services/ExquisitorAPI';
import { useItemStore } from '@/stores/items';
import type MediaItem from '@/types/mediaitem';
import { ItemButton, MediaType } from '@/types/mediaitem';
import type { ItemButtons, ItemInfo, RelatedItems } from '@/types/mediaitem';
import { computed, reactive, ref } from 'vue';

interface Props {
    modelId: number
    srcItem: MediaItem
    opened: boolean
}
const props = defineProps<Props>()

defineEmits(['closed', 'switch'])

const showOverlay = props.opened
const mainItem = ref(props.srcItem)

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
const details = reactive({
    infoPair: [['', ['']]],
    timelineN: 0,
    timelineRange: [-1,-1],
})

const itemIds : number[] = reactive([])
async function getItemInfo() {
    const resp = await itemStore.fetchItemInfo(mainItem.value.id)
    details.infoPair = resp.infoPair
}

async function getRelatedItems() {
    const resp = await itemStore.fetchRelatedItems(props.srcItem.id)
    details.timelineN = resp.timelineN
    details.timelineRange = resp.timelineRange
    for (let i = details.timelineRange[0]; i < details.timelineRange[1]; i++) {
        itemIds.push(i)
    }
}

function isLargeImage(image: string) {
    const img = new Image()
    img.src = image
    return img.height > window.innerHeight * 0.6;
}

async function switchMain(itemId: number) {
    const newItem : MediaItem = await getItem(itemId,props.modelId)
    mainItem.value = newItem
    getItemInfo()
}

const itemInfo = ref(false)
if (props.opened) {
    await getItemInfo()
    await getRelatedItems()
}
</script>

<template>
    <v-row>
        <v-col class="main">
            <!-- Image -->
            <v-img
             v-if="mainItem.mediaType === MediaType.Image"
             class="large-item-source"
             :id="'itemSrc'+mainItem.id"
             :src="mainItem.srcPath"
             :style="{ maxHeight : isLargeImage(mainItem.srcPath) ? '60vh' : 'auto'}"
            >
                <v-btn 
                 icon="mdi-information-outline"
                 color="yellow"
                 class="info-btn"
                 @click="itemInfo = !itemInfo"
                />
            </v-img>
            <!-- Video -->
        </v-col>

        <!-- Item Information -->
        <v-col v-if="itemInfo" cols="4">
            <v-card class="item-details">
                <v-card-text v-for="n in details.infoPair">
                    {{ n[0] }}: {{ n[1] }}                    
                </v-card-text>
            </v-card>
        </v-col> 
    </v-row>
    <!-- TIMELINE -->
    <v-row>
        <v-slide-group
         center-active
         show-arrows
        >
            <v-slide-group-item 
             v-for="(id,index) in itemIds" :key="index"
            >
                <item
                 class="timeline-item"
                 :buttons="buttons" 
                 :item-id="id"
                 :model-id="modelId"
                 :provided="false"
                 :overlay="false"
                 @click="switchMain(id)"
                />
            </v-slide-group-item>
        </v-slide-group>
    </v-row>
</template>

<style scoped>
.large-item-source {
    text-align: end;
}
.info-btn {
    margin-top: 1%;
    margin-right: 1%;
    position: relative;
}
.item-details {
    background-color: azure;
}
.v-slide-group {
    background-color: black;
    max-height: 20vh;
}
.timeline-item {
    max-height: 75%;
}
</style>
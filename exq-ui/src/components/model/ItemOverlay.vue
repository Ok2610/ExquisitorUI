<script setup lang="ts">
import Item from '@/components/model/Item.vue'
import { clearExcludedVideos, excludeVideo, getItem, isVideoExcluded } from '@/services/ExquisitorAPI';
import { useItemStore } from '@/stores/items';
import { useSessionStore } from '@/stores/sessions';
import type MediaItem from '@/types/mediaitem';
import { ILSets, ItemButton, MediaType } from '@/types/mediaitem';
import type { ItemButtons, ItemInfo, RelatedItems } from '@/types/mediaitem';
import { computed, reactive, ref } from 'vue';
import StartItem from '../start/StartItem.vue';

interface Props {
    modelId: number
    srcItem: MediaItem
    opened: boolean
}
const props = defineProps<Props>()

console.log('srcItem: ', props.srcItem)

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

const updTimeline = ref(0)

const details = reactive({
    infoPair: [['', ['']]],
    timelineN: mainItem.value.relatedItems!.timelineN,
    timelineRange: mainItem.value.relatedItems!.timelineRange,
})

const itemIds : {items: number[]} = reactive({items: []})

const start = ref(mainItem.value.id-3)
const end = ref(mainItem.value.id+4)
console.log('start', start.value)
console.log('end', end.value)
console.log('trs', details.timelineRange[0])
console.log('tre', details.timelineRange[1])
if (start.value < details.timelineRange[0]) {
    start.value = details.timelineRange[0];
    end.value = details.timelineRange[0]+8;
}
if (end.value > details.timelineRange[1]) {
    end.value = details.timelineRange[1]; 
    start.value = end.value-8;
}
console.log('start', start.value)
console.log('end', end.value)
for (let i = start.value; i < end.value; i++) {
    console.log(i)
    itemIds.items.push(i)
}

// for (let i = details.timelineRange[0]; i < details.timelineRange[1]; i++) {
//     itemIds.push(i)
// }

console.log('initial items: ', itemIds)

async function getItemInfo() {
    if (mainItem.value.metadata === undefined) {
        const resp = await itemStore.fetchItemInfo(props.modelId, mainItem.value.id)
        itemStore.setItemMetadata(mainItem.value.id, resp)
        mainItem.value.metadata = resp
        details.infoPair = resp.infoPair
    } else {
        details.infoPair = mainItem.value.metadata!.infoPair
    }
    
}

async function getRelatedItems() {
    const resp = await itemStore.fetchRelatedItems(props.srcItem.id)
    details.timelineN = resp.timelineN
    details.timelineRange = resp.timelineRange
}

async function switchMain(itemId: number) {
    console.log('Old', mainItem.value)
    const newItem : MediaItem = await getItem(itemId,props.modelId)
    mainItem.value = newItem
    console.log('New', mainItem.value)
    getItemInfo()
}

function nextClick() {
    console.log('Next Click')
    if (end.value+8 < details.timelineRange[1]) {
        itemIds.items = []
        for (let i = end.value; i < end.value+8; i++) {
            itemIds.items.push(i)
        }
        start.value = end.value
        end.value = end.value + 8
        updTimeline.value += 1
    } else if (end.value < details.timelineRange[1]) {
        itemIds.items = []
        for (let i = details.timelineRange[1]-8; i < details.timelineRange[1]; i++) {
            itemIds.items.push(i)
        }
        start.value = details.timelineRange[1]-8
        end.value = details.timelineRange[1]
        updTimeline.value += 1
    } 
    else if (end.value === details.timelineRange[1]) return
}

function prevClick() {
    console.log('Prev Click')
    if (start.value-8 > details.timelineRange[0]) {
        itemIds.items = []
        for (let i = start.value-8; i < start.value; i++)
            itemIds.items.push(i)
        end.value = start.value
        start.value = start.value - 8
        updTimeline.value += 1
    } else if (start.value > details.timelineRange[0]) {
        itemIds.items = []
        for (let i = details.timelineRange[0]; i < details.timelineRange[0]+8; i++)
            itemIds.items.push(i)
        start.value = details.timelineRange[0]
        end.value = details.timelineRange[0]+8
        updTimeline.value += 1
    } 
    else if (start.value === details.timelineRange[0]) return
}

const snackbar = ref(false)
const snackTimeout = ref(4000)
const snackColor = ref('white')
const text = ref('')
function snack(excOrNot: boolean) {
    if (excOrNot) {
        snackbar.value = true
        text.value = 'Excluded Video'
    } else {
        snackbar.value = true
        text.value = 'Video is no longer excluded'
    }
}

const isExcluded = ref(false)
async function checkExclude() {
    let res = await isVideoExcluded({session: useSessionStore().getSession, model: props.modelId, itemId: mainItem.value.id})
    isExcluded.value = res
}
checkExclude()

async function exclude() {
    if (!isExcluded.value) {
        isExcluded.value = true
        excludeVideo({session: useSessionStore().getSession, model: props.modelId, itemId: mainItem.value.id})
        snack(true)
    } else {
        isExcluded.value = false
        clearExcludedVideos({session: useSessionStore().getSession, model: props.modelId, items: [mainItem.value.id]})
        snack(false)
    }
}



const itemInfo = ref(false)
const srcCols = computed(() => {if (itemInfo.value) return 7; else return 11; })

if (props.opened) {
    await getItemInfo()
    if (mainItem.value.relatedItems === undefined)
        await getRelatedItems()
}
</script>

<template>
    <v-row 
     align="center"
     height="500px"
     no-gutters
    >
        <v-col cols="1" class="btn-col">
            <v-btn 
             icon="mdi-information-outline"
             color="yellow"
             class="info-btn"
             @click="itemInfo = !itemInfo"
            />
            <v-btn 
             icon="mdi-filter-remove"
             :color="isExcluded ? 'grey' : 'orange'"
             class="exc-btn"
             @click="exclude"
            />
        </v-col>
        <v-col :cols="srcCols" class="main">
            <!-- Image -->
            <v-img
             v-if="mainItem.mediaType === MediaType.Image"
             class="source-col"
             :id="'itemSrc'+mainItem.id"
             :src="mainItem.srcPath"
             height="500px"
            > 
            </v-img>
            <!-- Video -->
            <video
             v-if="mainItem.mediaType === MediaType.Video"
             class="source-col"
             :key="mainItem.srcPath"
             :id="'itemSrc'+mainItem.id"
             controls
             autoplay
             muted
             height="500"
            >
                <source :src="mainItem.srcPath" type="video/mp4"/>
            </video>
       </v-col>

        <!-- Item Information -->
        <v-col v-if="itemInfo" cols="4">
            <v-card class="item-details source-col">
                <v-card-text v-for="n in details.infoPair">
                    {{ n[0] }}: {{ n[1] }}                    
                </v-card-text>
            </v-card>
        </v-col> 
    </v-row>
    <!-- TIMELINE -->
    <v-row>
        <v-slide-group
         :key="updTimeline"
         center-active
         show-arrows="always"
        >
            <template v-slot:next>
                <v-icon @click="nextClick" icon="mdi-arrow-right"></v-icon>

            </template>
            <template v-slot:prev>
                <v-icon @click="prevClick" icon="mdi-arrow-left"></v-icon>
            </template>
            <v-slide-group-item 
             v-for="(id,index) in itemIds.items" :key="index"
            >
                <item
                 class='timeline-item'
                 :buttons="buttons" 
                 :item-id="id"
                 :model-id="modelId"
                 :provided="false"
                 :overlay="false"
                 @click="switchMain(id)"
                />
                <item v-if="id === mainItem.id"
                 class="timeline-item, chosen"
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
    <v-snackbar
     v-model="snackbar"
     :timeout="snackTimeout"
     location="bottom left"
     :color="snackColor"
    >
        {{ text }}
        <template v-slot:actions>
            <v-btn
             variant="text"
             @click="snackbar=false"
             icon="mdi-close"
            />
        </template>
    </v-snackbar>
</template>

<style scoped>
.chosen {
    border: 2px aqua;
}
.btn-col {
    text-align: center;
}
.info-btn {
    margin-top: 1%;
    margin-right: 1%;
    position: relative;
}
.exc-btn {
    position: relative;
    margin: 2px;
    margin-top: 5px;
}
.item-details {
    background-color: azure;
    height: fit-content;
}
.v-slide-group {
    background-color: black;
    max-height: 20vh;
}

.v-slide-group :deep(.v-slide-group__prev--disabled) {
    pointer-events: all;
    opacity: 1;
}
.v-slide-group :deep(.v-slide-group__next--disabled) {
    pointer-events: all;
    opacity: 1;
}

.timeline-item {
    max-height: 75%;
}
</style>
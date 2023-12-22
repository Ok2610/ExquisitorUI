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

defineEmits(['closed', 'switch'])

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

function isLargeImage(image: string) {
    const img = new Image()
    img.src = image
    return img.height > window.innerHeight * 0.6;
}

const itemInfo = ref(false)
if (props.opened) getItemInfo()
</script>

<template>
    <v-row>
        <v-col class="main">
            <!-- Image -->
            <v-img
             v-if="item.mediaType === MediaType.Image"
             class="large-item-source"
             :id="'itemSrc'+item.id"
             :src="item.srcPath"
             :style="{ maxHeight : isLargeImage(item.srcPath) ? '60vh' : 'auto'}"
            >
                <v-btn 
                 icon="mdi-information-outline"
                 color="yellow"
                 class="info-btn"
                 @click="itemInfo = !itemInfo"
                />
            </v-img>
        </v-col>
    
        <!-- Video -->

        <v-col v-if="itemInfo" cols="4">
            <v-card class="item-details">
                <v-card-text v-for="n in details.nameValuePair">
                    {{ n[0] }}: {{ n[1] }}                    
                </v-card-text>
            </v-card>
        </v-col> 
    </v-row>
    <v-container>
        <!-- TIMELINE GOES HERE -->
        <v-row>
            <v-col v-for="id in itemIds">
                <item
                :buttons="buttons" 
                :item-id="id"
                :model-id="modelId"
                :provided="false"
                @click="$emit('switch')"
                />
            </v-col>
        </v-row>
    </v-container>
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
</style>
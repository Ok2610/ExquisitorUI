<script setup lang="ts">
import { useItemStore } from '@/stores/items';
import type MediaItem from '@/types/mediaitem';
import { MediaType, type ItemButtons, ItemButton, ILSets } from '@/types/mediaitem';
import { computed, reactive, ref } from 'vue';

interface Props {
    buttons : ItemButtons
    itemId : number
    item?: MediaItem
    modelId : number
    provided : boolean
}
const props = defineProps<Props>()

defineEmits(['change'])

const itemStore = useItemStore()
const item : MediaItem = reactive({id: -1, srcPath:'', thumbPath:''})

async function getMediaItem() {
    await itemStore.fetchMediaItem(props.itemId, props.modelId)
    let mi = itemStore.items.get(props.itemId)!
    item.id = mi.id
    item.mediaId = mi.mediaId
    item.currentSets = mi.currentSets
    item.name = mi.name
    item.mediaType = mi.mediaType
    item.srcPath = mi.srcPath
    item.thumbPath = mi.thumbPath
}
if (!props.provided) {
    await getMediaItem()
} else {
    item.id = props.item!.id
    item.mediaId = props.item!.mediaId
    item.currentSets = props.item!.currentSets
    item.name = props.item!.name
    item.mediaType = props.item!.mediaType
    item.srcPath = props.item!.thumbPath
    item.thumbPath = props.item!.thumbPath
}
const isPos = computed(() => itemStore.isItemInPos)
const isNeg = computed(() => itemStore.isItemInNeg)
// const isHistory = computed(() => itemStore.isItemInHistory)
const isSubmitted = computed(() => itemStore.isItemInSubmitted)

const snackbar = ref(false)
const snackTimeout = ref(4000)
const snackColor = ref('white')
const text = ref('')
function snack(itemId: number, set: string) {
    snackbar.value = true
    text.value = 'Item ' + itemId + ' has been added to ' + set
}
const { addItemToSet } = itemStore
function addToSet(itemId: number, ilset: ILSets) {
    addItemToSet(itemId, props.modelId, ilset)
    if (ilset == ILSets.Positives) snackColor.value = 'success'
    if (ilset == ILSets.Negatives) snackColor.value = 'error'
    if (ilset == ILSets.Submitted) snackColor.value = 'indigo'
    snack(itemId, ILSets[ilset])
}

const itemHW = reactive({ maxHeight: (window.innerHeight * 0.25)+'px', maxWidth: (window.innerWidth * 0.3)+'px' })

</script>

<template>
    <v-sheet 
     class="ma-1 mb-3 bg-transparent item-hw">
        <v-img
         :id="'itemThumb'+item.id"
         :src="item.thumbPath"
         v-if="item.mediaType === MediaType.Image"
         class="bg-transparent"
         >
            <template v-slot:placeholder>
                <v-row 
                 class="fill-height ma-0"
                 justify="center"
                >
                    <v-progress-circular 
                     indeterminate
                     color="grey-lighten-5"
                    />
                </v-row>
            </template>
            
        </v-img>
        <v-sheet class="text-center bg-transparent">
            <v-hover>
                <template v-slot:default="{ isHovering, props }">
                    <v-btn v-if="buttons.buttons.has(ItemButton.Pos)" 
                     v-bind="props"
                     class="rounded-0"
                     variant="flat"
                     @click="addToSet(item.id, ILSets.Positives); $emit('change')"
                     :color="isHovering || isPos(item.id, modelId)? 'green' : 'black'"
                     :disabled="isPos(item.id, modelId)">
                        <v-icon>
                            mdi-thumb-up-outline
                        </v-icon>
                    </v-btn>
                </template>
            </v-hover>
            <v-hover>
                <template v-slot:default="{ isHovering, props }">
                    <v-btn v-if="buttons.buttons.has(ItemButton.Neg)" 
                     v-bind="props"
                     class="rounded-0"
                     variant="flat"
                     @click="addToSet(item.id, ILSets.Negatives); $emit('change')"
                     :color="isHovering || isNeg(item.id, modelId) ? 'red' : 'black'"
                     :disabled="isNeg(item.id, modelId)">
                        <v-icon>
                            mdi-thumb-down-outline
                        </v-icon>
                    </v-btn>
                </template>
            </v-hover>
            <v-hover>
                <template v-slot:default="{ isHovering, props }">
                    <v-btn v-if="buttons.buttons.has(ItemButton.Ignore)"
                     v-bind="props"
                     class="rounded-0"
                     variant="flat"
                     @click="addToSet(item.id, ILSets.History)"
                     :color="isHovering ? 'grey' : 'black'">
                        <v-icon>
                            mdi-eye-remove-outline                           
                        </v-icon>
                    </v-btn>
                </template>
            </v-hover>
            <v-hover>
                <template v-slot:default="{ isHovering, props }">
                    <v-btn v-if="buttons.buttons.has(ItemButton.Sub)" 
                     v-bind="props"
                     class="rounded-0"
                     variant="flat"
                     @click="addToSet(item.id, ILSets.Submitted)"
                     :color="isHovering || isSubmitted(item.id, modelId) ? 'indigo' : 'black'"
                     :disabled="isSubmitted(item.id, modelId)">
                        <v-icon>
                            mdi-send-variant-outline
                        </v-icon>
                    </v-btn>
                </template>
            </v-hover>
        </v-sheet>
        <v-snackbar
         v-model="snackbar"
         :timeout="snackTimeout"
         location="bottom right"
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
    </v-sheet>
</template>

<style scoped>
.item-hw {
    height: v-bind('itemHW.maxHeight');
}

.border-lightgrey {
    border: 1px solid lightgrey;
}
.pos {
    position: absolute;
    bottom: 0;
    left: 0;
}

.neg {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: transparent;
}

.neg:hover {
    color: #E57373
}

.ignore {
    position: absolute;
    top: 0;
    right: 0;
    background-color: transparent;
}

.ignore:hover {
    color:grey;
}

.sub {
    position: absolute;
    top: 0;
    left: 0;
    background-color: transparent;
}

.sub:hover {
    color: rgb(16, 164, 213);
}
</style>
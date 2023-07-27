<script setup lang="ts">
import { useItemStore } from '@/stores/items';
import type MediaItem from '@/types/mediaitem';
import { MediaType, type ItemButtons, ItemButton, ILSets } from '@/types/mediaitem';
import { computed, reactive, ref } from 'vue';

interface Props {
    buttons : ItemButtons
    item : MediaItem
    modelId : number
}
defineProps<Props>()

const itemStore = useItemStore()
const isPos = computed(() => itemStore.isItemInPos)
const isNeg = computed(() => itemStore.isItemInNeg)
const isHistory = computed(() => itemStore.isItemInHistory)
const isSubmitted = computed(() => itemStore.isItemInSubmitted)

const addItemToSet = computed(() => itemStore.addItemToSet)

const itemHeight = reactive({ height: (window.innerHeight * 0.25)+'px' })

</script>

<template>
    <template v-if="item.mediaType === MediaType.Image">
        <v-img
         :src="item.thumbPath"
         class="bg-transparent item-height"
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
            <v-hover>
                <template v-slot:default="{ isHovering, props }">
                    <v-btn v-if="buttons.buttons.has(ItemButton.Pos)" 
                     v-bind="props"
                     @click="() => addItemToSet(item.id, modelId, ILSets.Positives)"
                     class="ma-1 pos"
                     size="small"
                     :color="isHovering || isPos(item.id, modelId)? 'green' : 'black'"
                     :disabled="isPos(item.id, modelId)"
                     icon="mdi-thumb-up-outline" />
                </template>
             </v-hover>
            <v-hover>
                <template v-slot:default="{ isHovering, props }">
                    <v-btn v-if="buttons.buttons.has(ItemButton.Neg)" 
                     v-bind="props"
                     @click="() => addItemToSet(item.id, modelId, ILSets.Negatives)"
                     class="ma-1 neg"
                     size="small"
                     :color="isHovering || isNeg(item.id, modelId) ? 'red' : 'black'"
                     :disabled="isNeg(item.id, modelId)"
                     icon="mdi-thumb-down-outline" />
                </template>
            </v-hover>
            <v-hover>
                <template v-slot:default="{ isHovering, props }">
                    <v-btn v-if="buttons.buttons.has(ItemButton.Ignore)"
                     v-bind="props"
                     @click="() => addItemToSet(item.id, modelId, ILSets.History)"
                     class="ma-1 ignore" 
                     size="small"
                     :color="isHovering ? 'grey' : 'black'"
                     icon="mdi-eye-remove-outline" />
                </template>
            </v-hover>
            <v-hover>
                <template v-slot:default="{ isHovering, props }">
                    <v-btn v-if="buttons.buttons.has(ItemButton.Sub)" 
                     v-bind="props"
                     @click="() => addItemToSet(item.id, modelId, ILSets.Submitted)"
                     class="ma-1 sub" 
                     size="small"
                     :color="isHovering || isSubmitted(item.id, modelId) ? 'indigo' : 'black'"
                     :disabled="isSubmitted(item.id, modelId)"
                     icon="mdi-send-variant-outline" />
                </template>
            </v-hover>
        </v-img>
    </template>
</template>

<style scoped>
.item-height {
    height: v-bind('itemHeight.height');
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
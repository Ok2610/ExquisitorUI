<script setup lang="ts">
import type MediaItem from '@/types/mediaitem';
import { MediaType, type ItemButtons, ItemButton } from '@/types/mediaitem';
import { reactive, ref } from 'vue';

interface Props {
    buttons : ItemButtons
    item : MediaItem
}
defineProps<Props>()

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
                     class="ma-1 pos"
                     size="small"
                     :color="isHovering ? 'green' : 'black'"
                     icon="mdi-thumb-up-outline" />
                </template>
             </v-hover>
            <v-hover>
                <template v-slot:default="{ isHovering, props }">
                    <v-btn v-if="buttons.buttons.has(ItemButton.Neg)" 
                     v-bind="props"
                     class="ma-1 neg"
                     size="small"
                     :color="isHovering ? 'red' : 'black'"
                     icon="mdi-thumb-down-outline" />
                </template>
            </v-hover>
            <v-hover>
                <template v-slot:default="{ isHovering, props }">
                    <v-btn v-if="buttons.buttons.has(ItemButton.Ignore)"
                     v-bind="props"
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
                     class="ma-1 sub" 
                     size="small"
                     :color="isHovering ? 'indigo' : 'black'"
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
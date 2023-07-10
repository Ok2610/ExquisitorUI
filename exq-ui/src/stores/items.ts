import { getItem } from "@/services/MockExquisitorAPI";
import type { ILSets } from "@/types/mediaitem";
import type MediaItem from "@/types/mediaitem";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const ItemStore = defineStore('item', () => {
    const items : Map<number, MediaItem> = reactive(new Map<number,MediaItem>())
    
    function getMediaItem(exqId: number, modelId: number) {
        if (items.has(exqId)) {
            return items.get(exqId)
        } else {
            return getItem(exqId, modelId)
        }
    }
    
    function addItemToSet(exqId: number, modelId: number, ilset: ILSets) {
        items.get(exqId)?.currentSets.get(modelId)?.add(ilset)
    }
    
    function removeItemFromSet(exqId: number, modelId: number, ilset: ILSets) {
        items.get(exqId)?.currentSets.get(modelId)?.delete(ilset)
    }
    
    function removeModelFromItems(modelId: number) {
        items.forEach(item => item.currentSets.delete(modelId))
    }
    
    return {items, getMediaItem, addItemToSet, removeItemFromSet, removeModelFromItems}
})
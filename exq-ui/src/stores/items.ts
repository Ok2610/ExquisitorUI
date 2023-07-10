import { getItem } from "@/services/MockExquisitorAPI";
import type { ILSets } from "@/types/mediaitem";
import type MediaItem from "@/types/mediaitem";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useItemStore = defineStore('item', () => {
    const items : Map<number, MediaItem> = reactive(new Map<number,MediaItem>())
    
    function getMediaItem(exqId: number, modelId: number) {
        if (items.has(exqId)) {
            return items.get(exqId)
        } else {
            return getItem(exqId, modelId)
        }
    }
    
    function addItemToSet(exqId: number, modelId: number, ilset: ILSets) : boolean {
        return items.get(exqId)?.currentSets.get(modelId)?.add(ilset) == null
    }
    
    function addItemsToSet(exqIds: number[], modelId: number, ilset: ILSets) : boolean {
        for (var i = 0; i < exqIds.length; i++) {
            var success = items.get(exqIds[i])?.currentSets.get(modelId)?.add(ilset) == null
            if (!success) {
                console.log('Unable to add set to item: ' + exqIds[i])
                return false
            }
        }
        return true
    }
    
    function removeItemFromSet(exqId: number, modelId: number, ilset: ILSets) : boolean {
        return items.get(exqId)?.currentSets.get(modelId)?.delete(ilset) == null
    }
    
    function removeItemsFromSet(exqIds: number[], modelId: number, ilset: ILSets) : boolean {
        for (var i = 0; i < exqIds.length; i++) {
            var success = items.get(exqIds[i])?.currentSets.get(modelId)?.delete(ilset) == null
            if (!success) {
                console.log('Unable to delete set from item: ' + exqIds[i])
                return false
            }
        }
        return true
    }
    
    function removeModelFromItems(modelId: number) : void {
        items.forEach(item => item.currentSets.delete(modelId))
    }
    
    return {items, getMediaItem, addItemToSet, addItemsToSet, removeItemFromSet, removeItemsFromSet, removeModelFromItems}
})
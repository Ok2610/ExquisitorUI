import { getItem } from "@/services/MockExquisitorAPI";
import { ILSets } from "@/types/mediaitem";
import type MediaItem from "@/types/mediaitem";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useItemStore = defineStore('item', () => {
    const items : Map<number, MediaItem> = reactive(new Map<number,MediaItem>())
    const modelItems : Map<number, Set<number>> = reactive(new Map<number,Set<number>>())
    
    async function getMediaItem(exqId: number, modelId: number) : Promise<MediaItem> {
        if (items.has(exqId)) {
            return items.get(exqId)! // '!' Non-null
        } else {
            const item = await getItem(exqId, modelId)
            items.set(exqId, item)
            if (modelItems.has(modelId)) {
                modelItems.get(modelId)?.add(exqId)
            } else {
                modelItems.set(modelId, new Set<number>())
                modelItems.get(modelId)?.add(exqId)
            }
            return item
        }
    }
    
    async function getMediaItems(exqIds: number[], modelId: number) : Promise<MediaItem[]> {
        var mediaItems : MediaItem[] = []
        for (var i = 0; i < exqIds.length; i++) {
            if (items.has(exqIds[i])) {
                mediaItems.push(items.get(exqIds[i])!)
            } else {
                const item = await getItem(i, modelId)
                console.log('Inserting ', item)
                items.set(i, item)
                if (modelItems.has(modelId)) {
                    modelItems.get(modelId)?.add(i)
                } else {
                    modelItems.set(modelId, new Set<number>())
                    modelItems.get(modelId)?.add(i)
                }
                mediaItems.push(item)
            }    
        }
        return mediaItems
    }

    function addItemToSet(exqId: number, modelId: number, ilset: ILSets) : boolean {
        console.log('Adding Item:', exqId, 'to set', ilset)
        switch (ilset) {
            case ILSets.Positives:
                removeItemFromSet(exqId, modelId, ILSets.Negatives)
                removeItemFromSet(exqId, modelId, ILSets.History)
                return items.get(exqId)?.currentSets.get(modelId)?.add(ilset) == null
            case ILSets.Negatives:
                removeItemFromSet(exqId, modelId, ILSets.Positives)
                removeItemFromSet(exqId, modelId, ILSets.History)
                return items.get(exqId)?.currentSets.get(modelId)?.add(ilset) == null
            case ILSets.History:
                removeItemFromSet(exqId, modelId, ILSets.Positives)
                removeItemFromSet(exqId, modelId, ILSets.Negatives)
                return items.get(exqId)?.currentSets.get(modelId)?.add(ilset) == null
            default:
                return items.get(exqId)?.currentSets.get(modelId)?.add(ilset) == null
        }
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
    
    function isItemInPos(exqId: number, modelId: number) : boolean {
        if (items.get(exqId)?.currentSets.get(modelId)?.has(ILSets.Positives)) return true
        return false
    }

    function isItemInNeg(exqId: number, modelId: number) : boolean {
        if (items.get(exqId)?.currentSets.get(modelId)?.has(ILSets.Negatives)) return true
        return false
    }

    function isItemInSubmitted(exqId: number, modelId: number) : boolean {
        if (items.get(exqId)?.currentSets.get(modelId)?.has(ILSets.Submitted)) return true
        return false
    }

    function isItemInHistory(exqId: number, modelId: number) : boolean {
        if (items.get(exqId)?.currentSets.get(modelId)?.has(ILSets.History)) return true
        return false
    }

    function getSetItems(modelId: number, set: ILSets) : MediaItem[] {
        let setItems : MediaItem[] = []
        // Get all items for the current model
        let mItems = modelItems.get(modelId)
        mItems?.forEach((value, value2, s) => {
            // Check if item is in the positive set
            if (items.get(value)?.currentSets.get(modelId)?.has(set))
                setItems.push(items.get(value)!)
        })
        return setItems
    }

    return {
        items, 
        getMediaItem, 
        getMediaItems, 
        addItemToSet, 
        addItemsToSet, 
        removeItemFromSet, 
        removeItemsFromSet, 
        removeModelFromItems,
        isItemInPos,
        isItemInNeg,
        isItemInHistory,
        isItemInSubmitted,
        getSetItems,
    }
})
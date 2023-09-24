import { ILSets, type Meta} from "@/types/mediaitem";
import type MediaItem from "@/types/mediaitem";
import { defineStore } from "pinia";
import { reactive } from "vue";
import { getItem } from "@/services/ExquisitorAPI";
// import { getItem } from "@/services/MockExquisitorAPI";

export const useItemStore = defineStore('item', () => {
    const items : Map<number, MediaItem> = reactive(new Map<number,MediaItem>())
    const modelItems : Map<number, Set<number>> = reactive(new Map<number,Set<number>>())
    
    async function fetchMediaItem(exqId: number, modelId: number) : Promise<MediaItem> {
        if (modelItems.has(modelId)) {
            modelItems.get(modelId)!.add(exqId)
        } else {
            modelItems.set(modelId, new Set<number>())
            modelItems.get(modelId)!.add(exqId)
        }

        if (items.has(exqId)) {
            if (!items.get(exqId)!.currentSets!.has(modelId)) {
                items.get(exqId)!.currentSets!.set(modelId, new Set<ILSets>())
            }
            return items.get(exqId)! // '!' Non-null
        } else {
            const item = await getItem(exqId, modelId)
            items.set(exqId, item)
            return item
        }
    }
    
    async function fetchMediaItems(exqIds: number[], modelId: number) : Promise<MediaItem[]> {
        var mediaItems : MediaItem[] = []
        exqIds.forEach(async (v,_) => {
            if (modelItems.has(modelId)) {
                modelItems.get(modelId)!.add(v)
            } else {
                modelItems.set(modelId, new Set<number>())
                modelItems.get(modelId)!.add(v)
            }           
            if (items.has(v)) {
                console.log('Getting ', items.get(v))
                if (!items.get(v)!.currentSets!.has(modelId)) {
                    items.get(v)!.currentSets!.set(modelId, new Set<ILSets>())
                }
                mediaItems.push(items.get(v)!)
            } else {
                const item = await getItem(v, modelId)
                console.log('Inserting ', item)
                items.set(v, item)
                mediaItems.push(item)
            }    
        })
        return mediaItems
    }

    function addItemToSet(exqId: number, modelId: number, ilset: ILSets) : boolean {
        console.log('Adding Item:', exqId, 'to set', ilset, 'for model', modelId)
        switch (ilset) {
            case ILSets.Positives:
                removeItemFromSet(exqId, modelId, ILSets.Negatives)
                removeItemFromSet(exqId, modelId, ILSets.History)
                return items.get(exqId)!.currentSets!.get(modelId)!.add(ilset) == null
            case ILSets.Negatives:
                removeItemFromSet(exqId, modelId, ILSets.Positives)
                removeItemFromSet(exqId, modelId, ILSets.History)
                return items.get(exqId)!.currentSets!.get(modelId)!.add(ilset) == null
            case ILSets.History:
                removeItemFromSet(exqId, modelId, ILSets.Positives)
                removeItemFromSet(exqId, modelId, ILSets.Negatives)
                return items.get(exqId)!.currentSets!.get(modelId)!.add(ilset) == null
            case ILSets.Submitted:
                return items.get(exqId)!.currentSets!.get(modelId)!.add(ilset) == null
            default:
                return items.get(exqId)!.currentSets!.get(modelId)!.add(ilset) == null
        }
    }
    
    function addItemsToSet(exqIds: number[], modelId: number, ilset: ILSets) : boolean {
        exqIds.forEach((v,_) => {
            var success = items.get(v)!.currentSets!.get(modelId)!.add(ilset) == null
            if (!success) {
                console.log('Unable to add set to item: ' + ilset + ' ' + v)
                return false
            }
        })
        return true
    }
    
    function removeItemFromSet(exqId: number, modelId: number, ilset: ILSets) : boolean {
        return items.get(exqId)!.currentSets!.get(modelId)!.delete(ilset) == null
    }
    
    function removeItemsFromSet(exqIds: number[], modelId: number, ilset: ILSets) : boolean {
        exqIds.forEach((v,_) => {
            var success = items.get(v)!.currentSets!.get(modelId)!.delete(ilset) == null
            if (!success) {
                console.log('Unable to delete set from item: ' + ilset + ' ' + v)
                return false
            }
        })
        return true
    }
    
    function removeModelFromItems(modelId: number) : void {
        items.forEach(item => item.currentSets!.delete(modelId))
    }
    
    function isItemInPos(exqId: number, modelId: number) : boolean {
        if (!items.has(exqId)) return false
        if (items.get(exqId)!.currentSets!.get(modelId)?.has(ILSets.Positives)) return true
        return false
    }

    function isItemInNeg(exqId: number, modelId: number) : boolean {
        if (!items.has(exqId)) return false
        if (items.get(exqId)!.currentSets!.get(modelId)?.has(ILSets.Negatives)) return true
        return false
    }

    function isItemInSubmitted(exqId: number, modelId: number) : boolean {
        if (!items.has(exqId)) return false
        if (items.get(exqId)!.currentSets!.get(modelId)?.has(ILSets.Submitted)) return true
        return false
    }

    function isItemInHistory(exqId: number, modelId: number) : boolean {
        if (!items.has(exqId)) return false
        if (items.get(exqId)!.currentSets!.get(modelId)?.has(ILSets.History)) return true
        return false
    }

    function getSetItems(modelId: number, set: ILSets) : MediaItem[] {
        let setItems : MediaItem[] = []
        // Get all items for the current model
        let mItems = modelItems.get(modelId)
        mItems?.forEach((value, _) => {
            // Check if item is in the positive set
            if (items.get(value)!.currentSets!.get(modelId)!.has(set))
                setItems.push(items.get(value)!)
        })
        return setItems
    }
    
    function getItemInfo(itemId: number): Meta {
        return {
            nameValuePair: [['', ['']]],
            timelineN: 0,
            timelineRange: [-1,-1]
        }
    }

    return {
        items, 
        modelItems,
        fetchMediaItem, 
        fetchMediaItems, 
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
        getItemInfo
    }
})
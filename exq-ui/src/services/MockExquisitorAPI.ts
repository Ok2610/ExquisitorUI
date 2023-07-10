import { type ExqSuggestResponse, type ExqSuggestRequest, type ExqGetItemResponse } from "@/types/exq"
import type MediaItem from "@/types/mediaitem"
import { type ILSets } from "@/types/mediaitem"

const mockItems = [0,1,2,3,4,5,6,7,8,9,10,20,50,25,30,95,83,24,13,43,54,23,66,85,73,27,21,32,35,74,98,12,84]

// Initialize Exquisitor
export const initExquisitor = async (): Promise<boolean> => true

// Get information for collections 
// export const getCollections = async (): Promise<string[]> =>
//     await fetch('CALL_TO_API_HERE').then((val) => val.json())

// Get suggestions from the current model
export const urf = async (req: ExqSuggestRequest): Promise<ExqSuggestResponse> => {
    return await { suggestions : mockItems }
}


export const getItem = async (exqId: number, modelId: number): Promise<MediaItem> => {
    const ilsets = new Map<number,Set<ILSets>>()
    ilsets.set(modelId, new Set<ILSets>())
    return await { id: exqId, mediaId: exqId, currentSets: ilsets, thumbPath: '', srcPath: '' }
}
import { type ExqSuggestRequest, type ExqSuggestResponse, type ExqGetItemResponse } from "@/types/exq"
import type MediaItem from "@/types/mediaitem"
import type { ILSets } from "@/types/mediaitem"

// Initialize Exquisitor
export const initExquisitor = async (): Promise<boolean> =>
    await fetch('CALL_TO_API_HERE').then((val) => val.json())

// Get information for collections 
export const getCollections = async (): Promise<string[]> =>
    await fetch('CALL_TO_API_HERE').then((val) => val.json())

// Get suggestions from the current model
export const urf = async (req: ExqSuggestRequest): Promise<ExqSuggestResponse> => {
    // Example of calling API and then fitting the response JSON into desired type
    const resp : number[] = await fetch('CALL_TO_API_HERE', {
        method: 'POST',
        body: JSON.stringify(req)
    }).then((val) => val.json())
    return { suggestions : resp }
}


export const getItem = async (exqId: number, modelId: number): Promise<MediaItem> => {
    const sets = new Map<number,Set<ILSets>>()
    sets.set(modelId, new Set<ILSets>())
    const resp : ExqGetItemResponse = 
        await fetch('CALL_TO_API_HERE', {
            method: 'POST',
            body: JSON.stringify({ itemId: exqId })
        })
        .then((val) => val.json())

    return { id: resp.id, mediaId: resp.mediaId, currentSets: sets, thumbPath: resp.thumbPath, srcPath: resp.srcPath }
}

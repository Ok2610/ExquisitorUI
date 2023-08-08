import type { 
    ExqSuggestRequest, 
    ExqSuggestResponse,
    ExqGetItemResponse, 
    ExqInitResponse,
    ExqRemoveModelRequest,
    ExqInitModelRequest,
    ExqInitModelResponse,
ExqGetFiltersResponse
} from "@/types/exq"
import type MediaItem from "@/types/mediaitem"
import { MediaType, type ILSets } from "@/types/mediaitem"

// Initialize Exquisitor
// TODO: Specify collection
export const initExquisitor = async (): Promise<ExqInitResponse> => {
    return await fetch('CALL_TO_API_HERE').then((val) => val.json())
}

// Initialize model for user
export const initModel = async(req: ExqInitModelRequest): Promise<ExqInitModelResponse> => {
    return await fetch('CALL_TO_API_HERE', {
        method: 'POST',
        body: JSON.stringify(req)
    }).then(val => val.json())
}

export const removeModel = async(req: ExqRemoveModelRequest) : Promise<boolean> => {
    return await fetch('CALL_TO_API_HERE', {
        method: 'POST',
        body: JSON.stringify(req)
    }).then(val => val.json())
}

// Get information for collections 
export const getCollections = async (): Promise<string[]> =>
    await fetch('CALL_TO_API_HERE').then((val) => val.json())

// Get suggestions from the current model
export const doURF = async (req: ExqSuggestRequest): Promise<ExqSuggestResponse> => {
    // Example of calling API and then fitting the response JSON into desired type
    const resp : ExqGetItemResponse[] = await fetch('CALL_TO_API_HERE', {
        method: 'POST',
        body: JSON.stringify(req)
    }).then(val => val.json())
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
        .then(val => val.json())

    return { 
        id: resp.id, 
        mediaId: resp.mediaId, 
        currentSets: sets, 
        mediaType: resp.mediaType, 
        thumbPath: resp.thumbPath, 
        srcPath: resp.srcPath 
    }
}

export const getFilters = async (): Promise<ExqGetFiltersResponse> => {
    return await fetch('CALL_TO_API_HERE').then(val => val.json())
}
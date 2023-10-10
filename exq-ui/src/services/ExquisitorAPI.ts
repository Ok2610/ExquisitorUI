import type { 
    ExqSuggestRequest, 
    ExqSuggestResponse,
    ExqGetItemResponse, 
    ExqInitResponse,
    ExqRemoveModelRequest,
    ExqInitModelRequest,
    ExqInitModelResponse,
    ExqGetFiltersResponse,
    ExqApplyFiltersRequest,
    ExqResetFilterRequest,
    ExqSubmissionRequest
} from "@/types/exq"
import type MediaItem from "@/types/mediaitem"
import { MediaType, type ILSets } from "@/types/mediaitem"
import {
    initExquisitor as mockInitExq, 
    initModel as mockInitModel,
    removeModel as mockRemoveModel,
    doURF as mockDoURF,
    getItem as mockGetItem,
    getFilters as mockGetFilters,
} from "@/services/MockExquisitorAPI"

const exqURI = 'http://localhost:5001'
const mock = true


// Initialize Exquisitor
// TODO: Specify collection
export const initExquisitor = async (): Promise<ExqInitResponse> => {
    if (mock) return await mockInitExq()
    return await fetch(exqURI+'/initExquisitor', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((val) => val.json())
}

// Initialize model for user
export const initModel = async(req: ExqInitModelRequest): Promise<ExqInitModelResponse> => {
    console.log(req)
    if (mock) return await mockInitModel(req)
    const resp = await fetch(exqURI+'/initModel', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req)
    }).then(val => val.json())
    return resp
}

export const removeModel = async(req: ExqRemoveModelRequest) : Promise<boolean> => {
    if (mock) return await mockRemoveModel(req)
    return await fetch(exqURI+'/deleteModel', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req)
    }).then(val => val.json())
}

// Get information for collections 
export const getCollections = async (): Promise<string[]> =>
    await fetch('CALL_TO_API_HERE').then((val) => val.json())

// Get suggestions from the current model
export const doURF = async (req: ExqSuggestRequest): Promise<ExqSuggestResponse> => {
    if (mock) return await mockDoURF(req)
    const resp : ExqSuggestResponse = await fetch(exqURI+'/urf', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req)
    }).then(val => val.json())
    return resp
}


export const getItem = async (exqId: number, modelId: number): Promise<MediaItem> => {
    if (mock) return await mockGetItem(exqId, modelId)
    const sets = new Map<number,Set<ILSets>>()
    sets.set(modelId, new Set<ILSets>())
    const resp : ExqGetItemResponse = 
        await fetch(exqURI+'/getItem', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
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
    if (mock) return await mockGetFilters()
    return await fetch(exqURI+'/getFilters', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(val => val.json())
}

export const applyFilters = async (req: ExqApplyFiltersRequest): Promise<void> => {
    if (mock) return
    return await fetch(exqURI+'/applyFilters', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req)
    }).then()
}

export const resetFilters = async (req: ExqResetFilterRequest): Promise<void> => {
    if (mock) return
    return await fetch(exqURI+'/resetFilters', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req)
    }).then()
}

export const submitItem = async (req: ExqSubmissionRequest): Promise<void> => {
    if (mock) return
    return await fetch(exqURI+'/submit', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req)
    }).then()
}
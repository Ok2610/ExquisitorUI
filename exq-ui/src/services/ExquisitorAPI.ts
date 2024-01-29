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
    ExqSubmissionRequest,
    ExqSearchRequest,
    ExqTextSubmissionRequest,
    ExqQueryRewriteRequest,
    ExqExcludeVideoRequest,
    ExqClearExcludedVideoRequest,
    ExqGetExcludedVideosRequest,
    ExqGetExcludedVideosResponse,
    ExqExcludeVideoResponse
} from "@/types/exq"
import type MediaItem from "@/types/mediaitem"
import { MediaType, type ILSets, type ItemInfo, type RelatedItems } from "@/types/mediaitem"
import {
    initExquisitor as mockInitExq, 
    initModel as mockInitModel,
    removeModel as mockRemoveModel,
    doURF as mockDoURF,
    getItem as mockGetItem,
    getFilters as mockGetFilters,
} from "@/services/MockExquisitorAPI"
import type { ChatEntryQueryText, ChatEntryQueryPos } from "@/types/chat"
import { useSessionStore } from "@/stores/sessions"

const exqURI = 'http://localhost:5005'
// const exqURI = 'http://bjth.itu.dk:5001'
const mock = false 


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
    const sets = new Map<number,boolean[]>()
    sets.set(modelId, [false,false,false,false])
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
        name: resp.name,
        mediaId: resp.mediaId, 
        currentSets: sets, 
        mediaType: resp.mediaType, 
        thumbPath: resp.thumbPath, 
        srcPath: resp.srcPath,
        relatedItems: resp.relatedItems 
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

export const excludeVideo = async (req: ExqExcludeVideoRequest): Promise<void> => {
    if (mock) return
    return await fetch(exqURI+'/excludeVideo', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req)
    }).then()
}

export const isVideoExcluded = async (req: ExqExcludeVideoRequest): Promise<boolean> => {
    if (mock) return false
    const resp: ExqExcludeVideoResponse = await fetch(exqURI+'/isVideoExcluded', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req)
    }).then(val => val.json())
    return resp.excludedOrNot
}

// Remove one or more videos from the excluded list
export const clearExcludedVideos = async (req: ExqClearExcludedVideoRequest): Promise<void> => {
    if (mock) return
    return await fetch(exqURI+'/clearExcludedVideos', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req)
    }).then()
}

export const getExcludedVideos = async (req: ExqGetExcludedVideosRequest): Promise<ExqGetExcludedVideosResponse> => {
    if (mock) return {videos: []}
    return await fetch(exqURI+'/getExcludedVideos', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req)
    }).then(val => val.json())
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

export const submitText = async (req: ExqTextSubmissionRequest): Promise<void> => {
    if (mock) return
    return await fetch(exqURI+'/submitText', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req)
    }).then()
}

export const searchClip = async (req: ExqSearchRequest): Promise<number[]> => {
    if (mock) return [10,20,14]
    return await fetch(exqURI+'/searchClip', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req)
    }).then()
}

export const searchVLM = async (req: ExqSearchRequest): Promise<ChatEntryQueryText> => {
    if (mock) return { userQuery: req.query, vlmResults: [10,20,14]}
    // return { userQuery: req.query, vlmResults: [10,20,14,50]}
    // Calling different server instead of the Exquisitor Server
    const resp: { results: number[] } = await fetch('http://mandla-1:5001/searchVLM', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req)
    }).then(val => val.json())
    console.log(resp)
    // Logging on Exqusitor server
    fetch(exqURI+'/searchVLM', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userQuery: req.query, results: resp.results})
    }).then(val => val.json())
    return {userQuery: req.query, vlmResults: resp.results}
}

export const searchQueryRewrite = async (req: ExqQueryRewriteRequest): Promise<ChatEntryQueryPos> => {
    if (mock) return { userQuery: req.query, positive: req.positive, rewriteSuggestion: 'textual response' }
    const resp: string = await fetch('http://mandla-1:5001/rewriteQuery', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req)
    }).then(val => val.json())
    // Logging on Exqusitor server
    fetch(exqURI+'/rewriteQueryLog', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({query: req.query, positive: req.positive, caption: resp})
    }).then(val => val.json())

    return {userQuery: req.query, positive: req.positive, rewriteSuggestion: resp}
}

export const getItemInfo = async (model: number, itemId: number): Promise<ItemInfo> => {
    if (mock) return { infoPair: [['ID',[itemId.toString()]]] }
    const resp : ItemInfo = 
        await fetch(exqURI+'/getItemInfo', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                session: useSessionStore().getSession,
                model: model,
                itemId: itemId
            })
        }).then(val => val.json())
    return resp
}

export const getRelatedItems = async (itemId: number): Promise<RelatedItems> => {
    if (mock) {
        return {
            timelineN: 10,
            timelineRange: [10,20]
        }
    }
    const resp: RelatedItems =
        await fetch(exqURI+'/getRelatedItems', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ itemId: itemId })
        }).then(val => val.json())
    return resp
}
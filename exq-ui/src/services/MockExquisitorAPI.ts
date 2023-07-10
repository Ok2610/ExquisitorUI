import type { 
    ExqSuggestResponse, 
    ExqSuggestRequest, 
    ExqGetItemResponse, 
    ExqInitResponse, 
    ExqInitModelRequest,
    ExqRemoveModelRequest,
    ExqInitModelResponse
} from "@/types/exq"
import type MediaItem from "@/types/mediaitem"
import { type ILSets } from "@/types/mediaitem"
import type { GridGroup } from "@/types/model"

const mockItems : number[] = [0,1,2,3,4,5,6,7,8,9,10,20,50,25,30,95,83,24,13,43,54,23,66,85,73,27,21,32,35,74,98,12,84]
function getTestImagePaths() : string[] {
    var imgs : string[] = []
    for (var i = 0; i < 100; i++) {
        const imgName = i.toString().padStart(5, '0')
        imgs.push('/public/test-images/'+imgName+'.jpg')
    }
    return imgs
}
const imgPaths : string[] = getTestImagePaths()

// Initialize Exquisitor

export const initExquisitor = async (): Promise<ExqInitResponse> => { 
    return {session: 'testSession', success: true}
} 

export const initModel = async(req: ExqInitModelRequest): Promise<ExqInitModelResponse> => {
    var groups: GridGroup[] = []
    for (var i = 0; i < req.groups.length; i++) {
        groups.push({
            id: req.groups[i].id,
            itemsToShow: req.groups[i].itemsToShow,
            items: mockItems.sort(() => .5 - Math.random()).slice(0, req.groups[i].itemsToShow),
            name: req.groups[i].name
        })
    }
    return { groups: groups }
}

export const removeModel = async(req: ExqRemoveModelRequest) : Promise<boolean> => {
    return true
}

// Get information for collections 
// export const getCollections = async (): Promise<string[]> =>
//     await fetch('CALL_TO_API_HERE').then((val) => val.json())

// Get suggestions from the current model
export const doURF = async (req: ExqSuggestRequest): Promise<ExqSuggestResponse> => {
    const resp : ExqGetItemResponse[] = []
    for (var i = 0; i < req.n; i++) {
        resp.push({ id: mockItems[i], mediaId: mockItems[i], thumbPath: imgPaths[mockItems[i]], srcPath: imgPaths[mockItems[i]]}) 
    }
    return await { suggestions : resp }
}


export const getItem = async (exqId: number, modelId: number): Promise<MediaItem> => {
    const ilsets = new Map<number,Set<ILSets>>()
    ilsets.set(modelId, new Set<ILSets>())
    return await { id: exqId, mediaId: exqId, currentSets: ilsets, thumbPath: '', srcPath: '' }
}
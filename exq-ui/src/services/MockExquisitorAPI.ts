import type { 
    ExqSuggestResponse, 
    ExqSuggestRequest, 
    ExqGetItemResponse, 
    ExqInitResponse, 
    ExqInitModelRequest,
    ExqRemoveModelRequest,
    ExqInitModelResponse,
ExqGetFiltersResponse
} from "@/types/exq"
import type { Filter } from "@/types/filters"
import { FilterProperty, FilterType } from "@/types/filters"
import type MediaItem from "@/types/mediaitem"
import { MediaType, type ILSets } from "@/types/mediaitem"
import type { GridGroup } from "@/types/model"

const mockItems : number[] = [0,1,2,3,4,5,6,7,8,9,10,20,50,25,30,95,83,24,13,43,54,23,66,85,73,27,21,32,35,74,98,12,84]

function getTestImagePaths() : string[] {
    var imgs : string[] = []
    for (var i = 0; i < 100; i++) {
        const imgName = i.toString().padStart(5, '0')
        imgs.push('/test-images/'+imgName+'.jpg')
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
        // var random = mockItems.sort(() => .5 - Math.random()).slice(0, req.groups[i].itemsToShow)
        // var items : MediaItem[] = []
        // random.forEach(e => {
        //     const ilsets = new Map<number,Set<ILSets>>()
        //     ilsets.set(req.modelId, new Set<ILSets>())
        //     items.push({
        //         id: e, 
        //         mediaId: e, 
        //         currentSets: ilsets, 
        //         thumbPath: imgPaths[e], 
        //         srcPath: imgPaths[e] 
        //     })
        // })
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
        resp.push({ 
            id: mockItems[i], 
            mediaId: mockItems[i], 
            mediaType: MediaType.Image,
            thumbPath: imgPaths[mockItems[i]], 
            srcPath: imgPaths[mockItems[i]]}) 
    }
    return { suggestions : resp }
}


export const getItem = async (exqId: number, modelId: number): Promise<MediaItem> => {
    const ilsets = new Map<number,Set<ILSets>>()
    ilsets.set(modelId, new Set<ILSets>())
    return {
        id: exqId, 
        mediaId: exqId, 
        currentSets: ilsets, 
        mediaType: MediaType.Image, 
        thumbPath: imgPaths[exqId], 
        srcPath: imgPaths[exqId] 
    }
}


const mockFilters : Filter[] = [
    {
        collectionId: 'mock',
        name: 'Day',
        values: [
            [0,'Monday'],
            [1,'Tuesday'],
            [2,'Wednesday'],
            [3,'Thursday'],
            [4,'Friday'],
            [5,'Saturday'],
            [6,'Sunday']
        ],
        filter: FilterType.Single,
    },
    {
        collectionId: 'mock',
        name: 'Dominant Color',
        values: [
            [0,'Red'],
            [1,'Yellow'],
            [2,'Blue'],
            [3,'Green'],
            [4,'Purple'],
            [5,'Pink'],
            [6,'Orange'],
            [7,'Brown'],
            [8,'Black'],
            [9,'White']
        ],
        filter: FilterType.Single,
        property: FilterProperty.Color
    },

    {
        collectionId: 'mock',
        name: 'Month',
        values: [
            [0,'January'],
            [1,'February'],
            [2,'March'],
            [3,'April'],
            [4,'May'],
            [5,'June'],
            [6,'July'],
            [7,'August'],
            [8,'September'],
            [9,'October'],
            [10,'November'],
            [11,'December'],
        ],
        filter: FilterType.Multi,
    },
    {
        collectionId: 'mock',
        name: 'Hour',
        values: [],
        filter: FilterType.Range,
        range: [0,24]
    },
    {
        collectionId: 'mock',
        name: 'Objects',
        values: [
            [0,'apple'],
            [1,'helmet'],
            [2,'car'],
            [3,'skateboard'],
            [4,'ski'],
        ],
        filter: FilterType.Count,
        count: [[0,4],[1,3],[2,6],[3,5],[4,2]]
    },
    {
        collectionId: 'mock',
        name: 'Objects (Multi)',
        values: [
            [0,'apple'],
            [1,'helmet'],
            [2,'car'],
            [3,'skateboard'],
            [4,'ski'],
        ],
        filter: FilterType.MultiCount,
        count: [[0,4],[1,3],[2,6],[3,5],[4,2]]
    }
]

export const getFilters = async (): Promise<ExqGetFiltersResponse> => {
    return { filters: mockFilters }
}
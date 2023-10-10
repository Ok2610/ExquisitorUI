import type { 
    ExqSuggestResponse, 
    ExqSuggestRequest, 
    ExqGetItemResponse, 
    ExqInitResponse, 
    ExqInitModelRequest,
    ExqRemoveModelRequest,
    ExqInitModelResponse,
ExqGetFiltersResponse,
ExqApplyFiltersRequest,
ExqResetFilterRequest
} from "@/types/exq"
import type { Filter } from "@/types/filter"
import { FilterProperty, FilterType } from "@/types/filter"
import type MediaItem from "@/types/mediaitem"
import { MediaType, type ILSets } from "@/types/mediaitem"
import type { GridGroup } from "@/types/model"

const mockItems : number[] = [0,1,2,3,4,5,6,7,8,9,10,20,50,25,30,95,83,24,13,43,54,23,66,85,73,27,21,32,35,74,98,12,84]
const mockSearchItems : number[] = [32,55,17,69,82]

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
    const resp : number[] = []
    for (var i = 0; i < req.n; i++) {
        resp.push(mockItems[i])
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
        id: 0,
        collectionId: 'mock',
        name: 'Day',
        values: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ],
        filter: FilterType.Single,
    },
    {
        id: 1,
        collectionId: 'mock',
        name: 'Dominant Color',
        values: [
            'Red',
            'Yellow',
            'Blue',
            'Green',
            'Purple',
            'Pink',
            'Orange',
            'Brown',
            'Black',
            'White'
        ],
        filter: FilterType.Single,
        property: FilterProperty.Color
    },
    {
        id: 2,
        collectionId: 'mock',
        name: 'Month',
        values: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
        filter: FilterType.Multi,
    },
    {
        id: 3,
        collectionId: 'mock',
        name: 'Hour',
        values: [0,24],
        filter: FilterType.NumberRange,
        range: [0,24]
    },
    {
        id: 4,
        collectionId: 'mock',
        name: 'Hour',
        values: [0,24],
        filter: FilterType.NumberMultiRange,
        range: [0,24]
    },
    {
        id: 5,
        collectionId: 'mock',
        name: 'Objects',
        values: [
            'apple',
            'helmet',
            'car',
            'skateboard',
            'ski',
        ],
        filter: FilterType.Count,
        count: [[0,4],[1,3],[2,6],[3,5],[2,4]]
    },
    {
        id: 6,
        collectionId: 'mock',
        name: 'Objects (Multi)',
        values: [
            'apple',
            'helmet',
            'car',
            'skateboard',
            'ski',
        ],
        filter: FilterType.MultiCount,
        count: [[0,4],[1,3],[2,6],[3,5],[2,4]]
    }
]

export const getFilters = async (): Promise<ExqGetFiltersResponse> => {
    return { filters: mockFilters }
}

export const applyFilters = async (req: ExqApplyFiltersRequest): Promise<void> => {
    return;
}

export const resetFilters = async (req: ExqResetFilterRequest): Promise<void> => {
    return;
}


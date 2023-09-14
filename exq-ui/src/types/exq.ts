// Return types for ExquisitorAPI calls

import type { Filter } from "./filter"
import type { MediaType } from "./mediaitem"
import type { GridGroup, GridGroupInfo } from "./model"

export interface ExqInitResponse {
    session: string,
    success: boolean
}

export interface ExqInitModelRequest {
    session: string,
    modelId: number,
    groups: GridGroupInfo[]
}

export interface ExqInitModelResponse {
    groups: GridGroup[]
}

export interface ExqRemoveModelRequest {
    session: string
    modelId: number
}

export interface ExqSuggestRequest {
    n: number
    pos: number[]
    neg: number[]
    seen: number[]
}
export interface ExqSuggestResponse {
    suggestions : number[]
}

export interface ExqGetItemResponse {
    id: number
    mediaId: number
    mediaType: MediaType
    thumbPath: string
    srcPath: string
}

export interface ExqGetFiltersResponse {
    filters : Filter[]
}
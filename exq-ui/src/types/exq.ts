// Return types for ExquisitorAPI calls

import type { Filter } from "./filter"
import type { MediaType, RelatedItems } from "./mediaitem"
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
    session: string
    model: number
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
    name: string
    mediaId: number
    mediaType: MediaType
    thumbPath: string
    srcPath: string
    relatedItems: RelatedItems
}

export interface ExqGetFiltersResponse {
    filters : Filter[]
}

export interface ExqApplyFiltersRequest {
    session: string
    model: number
    names: string[]
    values: number[][]
}

export interface ExqResetFilterRequest {
    session: string
    model: number
}

export interface ExqSubmissionRequest {
    session: string
    model: number
    id: number,
    evalId: string,
}

export interface ExqTextSubmissionRequest {
    session: string
    model: number
    text: string,
    evalId: string,
}

export interface ExqSearchRequest {
    query: string
}
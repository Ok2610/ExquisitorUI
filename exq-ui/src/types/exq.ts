// Return types for ExquisitorAPI calls

export interface ExqSuggestRequest {
    n: number
    pos: number[]
    neg: number[]
    seen: number[]
    // filters: number[][]
}
export interface ExqSuggestResponse {
    suggestions : number[]
}

export interface ExqGetItemResponse {
    id: number
    mediaId: number
    thumbPath: string
    srcPath: string
}
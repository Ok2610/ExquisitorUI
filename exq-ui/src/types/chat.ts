import type MediaItem from "./mediaitem";

export interface ChatEntryQueryText {
    userQuery: string,
    vlmResults: number[],
}

export interface ChatEntryQueryPos {
    userQuery: string,
    positive: number,
    rewriteSuggestion: string
}
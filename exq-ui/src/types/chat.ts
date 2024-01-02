import type MediaItem from "./mediaitem";

export interface ChatEntry {
    userMsg: string,
    vlmResponse: string | number[]
}
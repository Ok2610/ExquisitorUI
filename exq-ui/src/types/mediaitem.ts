export enum ILSets {
    Positives=0,
    Negatives,
    History,
    Submitted,
}

export enum ItemButton {
    Pos=0,
    Neg,
    Ignore,
    Sub
}

export interface ItemButtons {
    buttons : Set<ItemButton>
}

export enum MediaType {
    Image=0,
    Video
}

export interface Meta {
    nameValuePair: [string, string[]][]
    timelineN: number // Number of items in group
    timelineRange: [number,number] // ExqId start to end of group
}

export default interface MediaItem {
    id : number,
    mediaId? : number, // Id in its collection, if only one collection than id === mediaId
    videoId? : number,
    name? : string,
    currentSets? : Map<number,Set<ILSets>>,
    mediaType? : MediaType,
    thumbPath : string, // For Items in Grid and Overlays
    srcPath : string // Enlarged version for Summary View, if downloading and rendering is no problem use this path in thumbPath
    metadata?: Meta
}
export enum ILSets {
    Suggestions=0,
    Positives,
    Negatives,
    History,
    Submitted,
}

export default interface MediaItem {
    id : number,
    mediaId : number, // Id in its collection, if only one collection than id === mediaId
    videoId? : number,
    name? : string,
    currentSets : Map<number,Set<ILSets>>,
    thumbPath : string, // For Items in Grid and Overlays
    srcPath : string // Enlarged version for Summary View, if downloading and rendering is no problem use this path in thumbPath
    metadata?: object // Name : Value, each value should be an array
}
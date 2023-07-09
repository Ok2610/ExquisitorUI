export interface MediaItem {
    id : number,
    mediaId : number,
    videoId? : number,
    currentSets : [],
    name? : string,
    thumbPath : string, // For Items in Grid and Overlays
    srcPath : string // Enlarged version for Summary View, if downloading and rendering is no problem use this path in thumbPath
}

export interface GridGroup {
    id : number,
    name? : string    
}

export default interface Model {
    id : number,
    name : string,
    positives? : MediaItem[], //TODO: Consider using Item[] here instead
    negatives? : MediaItem[], //TODO: Consider using Item[] here instead
    history? : MediaItem[], //TODO: Consider using Item[] here instead
    grid? : GridGroup[], //TODO: Use GridGroup[] instead
    settings? : any, //Settings type, number of suggestions, modalities, etc.
    activeFilters? : any, //TODO: Change to array of Filter types
    activeSearch? : string[], //TODO: Consider using a Search type with keyword and search form
}


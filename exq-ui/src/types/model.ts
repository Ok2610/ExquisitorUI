export interface GridGroup {
    id : number,
    name? : string    
}

export enum ResourceValues {
    Low=0,
    Medium,
    High
}

export interface Settings {
    itemsToShow: number,
    resources: ResourceValues
}

export default interface Model {
    id : number,
    name : string,
    settings : Settings, //Settings type, number of suggestions, modalities, etc.
    positives? : number[], //TODO: Consider using Item[] here instead
    negatives? : number[], //TODO: Consider using Item[] here instead
    history? : number[], //TODO: Consider using Item[] here instead
    grid? : GridGroup[], //TODO: Use GridGroup[] instead
    activeFilters? : any, //TODO: Change to array of Filter types
    activeSearch? : string[], //TODO: Consider using a Search type with keyword and search form
}


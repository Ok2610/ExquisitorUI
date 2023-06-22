export const urf = async (pos: number[], neg: number[], seen: number[]): Promise<number[]> =>
    await fetch('CALL_TO_API_HERE').then((val) => val.json())

    
export const getCollections = async (): Promise<string[]> =>
    await fetch('CALL_TO_API_HERE').then((val) => val.json())
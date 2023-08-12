import type { SearchResults } from "@/types/search";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useSearchStore = defineStore('search', () => {
    const queries = reactive(new Map<number,Map<string,SearchResults>>())
    const lastQuery = reactive(new Map<number,SearchResults>())

    function updateLastQuery(modelId: number, searchResults: SearchResults) {
        lastQuery.set(modelId, searchResults)
        if (!queries.has(modelId)) {
            queries.set(modelId, new Map<string,SearchResults>())
        }
        queries.get(modelId)!.set(searchResults.query,searchResults)
    }

    function clearLastQuery(modelId: number) {
        if (lastQuery.has(modelId)) lastQuery.delete(modelId)
    }

    return {
        lastQuery,
        updateLastQuery,
        clearLastQuery
    }
})
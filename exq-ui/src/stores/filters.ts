import { getFilters } from "@/services/MockExquisitorAPI";
// import { getFilters } from "@/services/ExquisitorAPI";
import type { Filter } from "@/types/filters";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useFilterStore = defineStore('filter', () => {
    const filters : Filter[] = reactive([])
    
    async function loadFilters() {
        const resp = await getFilters()
        filters.push(...resp.filters)
    }

    return { filters, loadFilters }
})
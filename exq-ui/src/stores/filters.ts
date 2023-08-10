import { getFilters } from "@/services/MockExquisitorAPI";
// import { getFilters } from "@/services/ExquisitorAPI";
import type { Filter } from "@/types/filter";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useFilterStore = defineStore('filter', () => {
    const filters : Filter[] = reactive([])
    const filtersLoaded = ref(false)
    // modelId, [filterId, values]
    const activeFilters : [number,[number,number[]]][] = reactive([])
    
    async function loadFilters() {
        const resp = await getFilters()
        filters.push(...resp.filters)
        filtersLoaded.value = true
    }

    return { filters, filtersLoaded, loadFilters }
})
import type { Filter } from "@/types/filter";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { applyFilters, getFilters, resetFilters } from "@/services/ExquisitorAPI";
import { useSessionStore } from "./sessions";
import type { ExqApplyFiltersRequest } from "@/types/exq";
// import { getFilters } from "@/services/MockExquisitorAPI";

export const useFilterStore = defineStore('filter', () => {
    const session = useSessionStore().getSession
    const filters : Filter[] = reactive([])
    const filtersLoaded = ref(false)
    // modelId, [filterId, values]
    const activeFilters : Map<number,number[][]> = 
        reactive(new Map<number, number[][]>())
    
    // const noneActiveFilters : Map<number,number[][]> = 
    //     reactive(new Map<number, number[][]>())

    async function loadFilters(modelId: number) {
        activeFilters.set(modelId, [])
        await getFilters().then((resp) => { 
            filtersLoaded.value = true
            filters.push(...resp.filters)
            filters.forEach(element => {
                activeFilters.get(modelId)!.push([])
            });
        })
        console.log('filters:', filters)
    }
    
    async function addFilters(modelId: number, filterVals: number[][]) {
        let names: string[] = []
        let values: number[][] = []
        filters.forEach(element => {
            if (filterVals[element.id].length > 0)
                activeFilters.get(modelId)![element.id] = filterVals[element.id]
                names.push(element.name.toLowerCase())
                values.push(filterVals[element.id])
        });
        console.log('filters to add', names, values)
        const resp = await applyFilters({session: session, model: modelId, names: names, values: values})
        console.log('addFilters:', resp)
    }
    
    async function clearFilters(modelId: number) {
        filters.forEach(element => {
            activeFilters.get(modelId)![element.id] = []
        });
        await resetFilters({session: session, model: modelId})
    }

    // function updateNoneActiveFilters(modelId:number, setFilters:number[][]) {
    //     noneActiveFilters.set(modelId, setFilters)
    // }

    return { 
        activeFilters,
        filters,
        filtersLoaded,
        loadFilters,
        addFilters,
        clearFilters,
        // updateNoneActiveFilters
    }
})
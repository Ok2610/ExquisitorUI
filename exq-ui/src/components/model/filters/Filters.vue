<script setup lang="ts">
import { useFilterStore } from '@/stores/filters';
import { FilterType } from '@/types/filter';
import { reactive, ref } from 'vue';
import RangeFilter from '@/components/model/filters/RangeFilter.vue'
import CountFilter from '@/components/model/filters/CountFilter.vue'
import { getCurrentInstance } from 'vue';

interface Props {
    modelId : number
    color : string
    opened : boolean
}
const props = defineProps<Props>()

const emit = defineEmits(['filterUpdate'])

const color = props.color

const filterStore = useFilterStore()
if (!filterStore.filtersLoaded)
    await filterStore.loadFilters(props.modelId)

const filters = filterStore.filters

const collections = reactive(new Set<string>())
const filterValues: (string | number)[][] = reactive(new Array<string[]|number[]>())
let setFilters: number[][] = []

if (filterStore.filtersLoaded) {
    filters.forEach((v,_) => { 
        collections.add(v.collectionId) 
        setFilters.push(filterStore.activeFilters.get(props.modelId)![v.id])
        filterValues.push([])
        filterValues[v.id] = setFilters[v.id].map((f,_) => v.values[f])
    })
    console.log(filterValues)
    console.log(setFilters)
}

function updateSetFilters(filterId: number, values: string[]|number[]) {
    let valIds : number[] = []
    values.forEach(element => {
        valIds.push(filters[filterId].values.findIndex((v) => v === element))
    });
    // if (setFilters[filterId].length > valIds.length)
    //     applyFilters()
    setFilters[filterId] = valIds
    //filterStore.updateNoneActiveFilters(props.modelId, setFilters)
    console.log('setFilters', setFilters)
    console.log('filterValues', filterValues)
}

async function applyFilters() {
    await filterStore.addFilters(props.modelId, setFilters)
    emit('filterUpdate')
}

async function clearFilters() {
    filters.forEach((element,_) => {
        filterValues[element.id] = []
    });
    await filterStore.clearFilters(props.modelId)
    emit('filterUpdate')
}

</script>

<template>
    <v-sheet 
     class="pt-3 text-center"
     :color="color"
     >
        <v-btn size="small" icon="mdi-check" @click="applyFilters"></v-btn>
        <v-divider vertical thickness="10" />
        <v-btn size="small" icon="mdi-close" @click="clearFilters"></v-btn>
    </v-sheet>
    <template v-for="filter in filters">
        <v-sheet v-if="filter.filter == FilterType.Single"
         class="mx-auto pt-5 ml-2 mr-2"
         :color="color"
        >
            <v-combobox
             v-model="filterValues[filter.id][0]"
             clearable
             auto-select-first
             :label="filter.name"
             :items="filter.values.map((v,_) => v)"
             variant="solo-filled"
             @update:model-value="(vals) => updateSetFilters(filter.id, vals)"
             dense
            />
        </v-sheet>        
        <v-sheet v-if="filter.filter == FilterType.Multi"
         class="mx-auto pt-5 ml-2 mr-2"
         :color="color"
        >
            <v-combobox
             v-model="filterValues[filter.id]"
             chips
             closable-chips
             clearable
             multiple
             auto-select-first="exact"
             :label="filter.name"
             :items="filter.values.map((v,_) => v)"
             variant="solo-filled"
             dense
             @update:model-value="(vals) => updateSetFilters(filter.id, vals)"
            />
        </v-sheet>        
        <v-sheet v-if="filter.filter == FilterType.NumberRange"
         class="mx-auto pt-5 ml-2 mr-2"
         :color="color"
        >
           <range-filter
            :name="filter.name"
            :range="filter.range!"
            @value-update="(values) => { filter.values[0] = values[0]; filter.values[1] = values[1]; console.log(values) }"
           />
        </v-sheet>
        <v-sheet v-if="filter.filter == FilterType.Count"
         class="mx-auto pt-5 ml-2 mr-2"
         :color="color"
        >
            <count-filter
                :model-id="modelId"
                :name="filter.name"
                :items="filter.values"
                :count="filter.count!"
                :is-multi="false"
            />
        </v-sheet>
        <v-sheet v-if="filter.filter == FilterType.MultiCount"
         class="mx-auto pt-5 ml-2 mr-2"
         :color="color"
        >
            <count-filter
                :model-id="modelId"
                :name="filter.name"
                :items="filter.values"
                :count="filter.count!"
                :is-multi="true"
            />
        </v-sheet>

    </template>
</template>

<style scoped>

</style>
<script setup lang="ts">
import { useFilterStore } from '@/stores/filters';
import { FilterType } from '@/types/filter';
import { reactive } from 'vue';
import RangeFilter from '@/components/model/filters/RangeFilter.vue'
import CountFilter from '@/components/model/filters/CountFilter.vue'

interface Props {
    modelId : number
    color : string
}
const props = defineProps<Props>()

const color = props.color

const filterStore = useFilterStore()
if (!filterStore.filtersLoaded)
    await filterStore.loadFilters()

const filters = filterStore.filters
const activeFilters = filterStore.activeFilters

const collections = reactive(new Set<string>())
filters.forEach((v,_) => { collections.add(v.collectionId) })

function applyFilters() {
    
}

function clearFilters() {
    
}
</script>

<template>
    <v-sheet 
     class="pt-3 text-center"
     :color="color"
     >
        <v-btn size="small" icon="mdi-check"></v-btn>
        <v-divider vertical thickness="10" />
        <v-btn size="small" icon="mdi-close"></v-btn>
    </v-sheet>
    <template v-for="filter in filters">
        <v-sheet v-if="filter.filter == FilterType.Single"
         class="mx-auto pt-5 ml-2 mr-2"
         :color="color"
        >
            <v-combobox
             clearable
             :label="filter.name"
             :items="filter.values.map((v,_) => v)"
             variant="solo-filled"
            />
        </v-sheet>        
        <v-sheet v-if="filter.filter == FilterType.Multi"
         class="mx-auto pt-5 ml-2 mr-2"
         :color="color"
        >
            <v-combobox
             chips
             closable-chips
             clearable
             multiple
             :label="filter.name"
             :items="filter.values.map((v,_) => v)"
             variant="solo-filled"
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
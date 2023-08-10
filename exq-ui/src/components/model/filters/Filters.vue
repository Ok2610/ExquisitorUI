<script setup lang="ts">
import { useFilterStore } from '@/stores/filters';
import { FilterType } from '@/types/filter';
import { reactive } from 'vue';
import RangeFilter from '@/components/model/filters/RangeFilter.vue'

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

const collections = reactive(new Set<string>())
filters.forEach((v,_) => { collections.add(v.collectionId) })
</script>

<template>
    <v-sheet 
     class="pt-3"
     :color="color"
     >
        <v-btn location="top center" icon="mdi-close"></v-btn>
    </v-sheet>
    <template v-for="filter in filters">
        <v-sheet v-if="filter.filter == FilterType.Single"
         class="mx-auto pt-5 ml-2 mr-2"
         :color="color"
        >
            <v-combobox
             clearable
             :label="filter.name"
             :items="filter.values.map((v,_) => v[1])"
             variant="solo-filled"
            />
        </v-sheet>        
        <v-sheet v-if="filter.filter == FilterType.Multi"
         class="mx-auto pt-5 ml-2 mr-2"
         :color="color"
        >
            <v-combobox
             chips
             clearable
             multiple
             :label="filter.name"
             :items="filter.values.map((v,_) => v[1])"
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
            @value-update="(values) => { filter.values[0][1] = values[0]; filter.values[1][1] = values[1]; console.log(values) }"
           />
        </v-sheet>
    </template>
</template>

<style scoped>

</style>
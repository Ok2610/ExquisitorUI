<script setup lang="ts">
import { reactive, ref, type Ref } from 'vue';

interface Props {
    modelId: number,
    name: string
    items: [number,string|number][]
    count: [number,number][]
    isMulti: boolean
}
const props = defineProps<Props>();

// Single
const singleMinMax: number[]= reactive([0])
const singleValue: [number,number,number] = reactive([-1,0,0])

function getCountRange(val: any & number|string) {
    console.log(val)
    const it = props.items.find((v,_) => v[1] == val)
    console.log(it)
    const min = props.count[it![0]][0]
    const max = props.count[it![0]][1]
    const len = singleMinMax.length
    // Clear arr
    for (let i = 0; i < len; i++) {
        singleMinMax.splice(0,1);
    }
    // Fill with new range values (include max value)
    for (let i = min; i < max+1; i++) {
        singleMinMax.push(i)
    }
}

function updateSingleValue(item: [number, string|number]) {
    
}
</script>

<template>
    <v-card color="white">
        <v-card-title class="text-body-1">
            {{ name }}
        </v-card-title>
        <v-card-text v-if="isMulti">
            Multi
            <v-combobox
             :items="items.map((e) => e[1])"
            />
        </v-card-text>
        <v-card-text v-else>
            None-multi
            <v-combobox
             :items="items.map((v,_) => v[1])"
             @update:model-value="getCountRange"
            />
            <v-combobox
                :items="singleMinMax"
            />
        </v-card-text>
    </v-card>
</template>

<style scoped>

</style>
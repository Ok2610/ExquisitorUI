<script setup lang="ts">
import { ref } from 'vue';
import filters from '@/components/model/filters/Filters.vue'
import search from '@/components/model/search/Search.vue'

interface Props {
    modelId: number
}
defineProps<Props>()

const rail = ref(true)

const filterToggle = ref(false)
const searchToggle = ref(false)

</script>

<template>
    <v-navigation-drawer
     theme="dark"
     rail
    >
        <v-list>
            <v-list-item
             prepend-icon="mdi-format-list-bulleted"
             @click="console.log('clicked filter'); filterToggle = !filterToggle;"
            >
            </v-list-item>

            <v-divider :thickness="30" class="border-opacity-0"></v-divider>

            <v-list-item
             prepend-icon="mdi-magnify"
             @click="console.log('clicked search')"
            >
            </v-list-item>

            <v-divider :thickness="30" class="border-opacity-0"></v-divider>

            <v-list-item
             prepend-icon="mdi-call-merge"
             @click="console.log('clicked merge')"
            >
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
    
    <v-navigation-drawer 
     v-if="filterToggle"
     location="left"
     color="indigo-lighten-3"
    >
        <filters :model-id="modelId" :color="'indigo-lighten-3'"/>
    </v-navigation-drawer>

    <v-navigation-drawer
     v-if="searchToggle"
     location="left"
     theme="dark"
    >
        <search :model-id="modelId" />
    </v-navigation-drawer>
</template>

<style scoped>

</style>

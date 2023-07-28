<script setup lang="ts">
import { computed, ref } from 'vue';


interface Props {
    modelId: number
}
defineProps<Props>()

const rail = ref(true)

</script>

<template>
    <v-navigation-drawer
     theme="dark"
     rail
    >
        <v-list>
            <v-list-item
             prepend-icon="mdi-format-list-bulleted"
             @click="console.log('clicked filter')"
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
</template>

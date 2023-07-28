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
     location="right"
     rail
    >
        <v-list>
            <v-list-item
             prepend-icon="mdi-thumb-up-outline"
             @click="console.log('clicked positives')"
            >
            </v-list-item>

            <v-divider :thickness="30" class="border-opacity-0"></v-divider>

            <v-list-item
             prepend-icon="mdi-thumb-down-outline"
             @click="console.log('clicked negatives')"
            >
            </v-list-item>

            <v-divider :thickness="30" class="border-opacity-0"></v-divider>

            <v-list-item
             prepend-icon="mdi-history"
             @click="console.log('clicked history')"
            >

            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

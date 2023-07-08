<script setup lang="ts">
import type Model from '@/types/model';


interface Props { 
    currModel : Model 
}
defineProps<Props>()



function testAction() {
    console.log('testAction');
    return 0;
}

</script>

<template>
    <v-container class="d-block">
        <h1>{{ currModel.name }}</h1>
        <v-btn @click="testAction">
           TEST
            <v-tooltip 
             activator="parent" 
             location="bottom"
             open-delay="500"
             >
                Test tooltip text
            </v-tooltip>
        </v-btn>
    </v-container>
</template>

<style scoped>

</style>
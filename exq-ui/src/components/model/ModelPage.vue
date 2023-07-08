<script setup lang="ts">

interface Props { }
defineProps<Props>()

function testAction() {
    console.log('testAction');
    return 0;
}

</script>

<template>
    <v-tooltip text="This is some helpful text">
        <v-btn @click="testAction" color="primary" hover-text="This is some helpful text">
            
        </v-btn>
    </v-tooltip>
</template>

<style scoped>

</style>
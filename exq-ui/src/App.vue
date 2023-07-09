<script setup lang="ts">
import StartPage from './components/start/StartPage.vue';
import SessionPage from './components/SessionPage.vue';
</script>

<template>
    <!-- <StartPage /> -->
    <Suspense>
        <session-page />
        <template #fallback>
            <h1>Failed to call Exquisitor API</h1>
        </template>
    </Suspense>
</template>

<style scoped>

</style>

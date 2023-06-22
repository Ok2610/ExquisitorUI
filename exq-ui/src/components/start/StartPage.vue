<script setup lang="ts">
import StartMessage from './StartMessage.vue'
import StartOptions from './StartOptions.vue'
import { urf } from '@/services/ExquisitorAPI'
import { ref } from 'vue'

function runURF() {
    const pos = ref([0, 1, 2])
    const neg = ref([3, 4, 5])
    const seen = ref([7, 8, 9])
    return urf(pos.value, neg.value, seen.value)
}
</script>

<template>
    <header>
        <img alt="Exq Logo" class="logo" src="../../assets/exq_logo.png" width="250" height="125" />

        <div class="wrapper">
            <StartMessage msg="Welcome to Exquisitor!" qst="What would you like to do?"/>
        </div>
    </header>

    <main>
        <StartOptions />
    </main>
</template>

<style scoped>
header {
    position: relative;
    line-height: 1.5;
    display: flex;
    place-items: center;
}

.logo {
    margin: 0 1.5rem 0 0;
}

.wrapper {
    position: relative;
    display: flex;
    flex-wrap: wrap;
}

main {
    padding-left: calc(var(--section-gap)*1.5);
}

</style>
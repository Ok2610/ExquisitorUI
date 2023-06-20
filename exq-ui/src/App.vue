<script setup lang="ts">
import StartMessage from './components/start/StartMessage.vue'
import StartOptions from './components/start/StartOptions.vue'
import { urf } from './services/ExquisitorAPI'
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
        <img alt="Exq Logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

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
    line-height: 1.5;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }
}
</style>

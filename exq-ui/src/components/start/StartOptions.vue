<script setup lang="ts">
import StartItem from './StartItem.vue'
import { getCollections } from '@/services/ExquisitorAPI';
import Dropdown from '@/components/general/Dropdown.vue';
import { ref } from 'vue'

const collections = ref(['test', 'test1', 'test2', 'test3'])//await getCollections()
const sessions = ref(['abc'])//await getSessions()
const latestSession = sessions.value[0]

</script>

<template>
    <StartItem :zLevel=1>
        <template #icon>
            <v-icon name="co-media-play" scale="1.8"/>
        </template>
        <template #heading>Start New Session</template>
        <div class="dd">
            <p>Select collection to use:</p>
            <Dropdown name="Collection" :options=collections />
        </div>
    </StartItem>

    <StartItem :zLevel=0>
        <template #icon>
            <v-icon name="co-reload" scale="1.8" />
        </template>
        <template #heading>Open Last Session</template>
        Latest session: {{ latestSession }}
    </StartItem>

    <StartItem :zLevel=0>
        <template #icon>
            <v-icon name="co-list" scale="1.8"/>
        </template>
        <template #heading>View Previous Sessions</template>
        <!-- TODO: New page with sessions -->
        Load previous sessions, or combine sessions to create a new session.
    </StartItem>

</template>

<style scoped>
.dd {
    position: relative;
    display: flex;
}
.dd p {
    padding-right: 5px;
}

</style>
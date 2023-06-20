<script setup lang="ts">
import StartItem from './StartItem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import SupportIcon from './icons/IconSupport.vue'
import ToolingIcon from './icons/IconTooling.vue'
</script>

<template>
    <StartItem>
        <template #icon>
            <DocumentationIcon />
        </template>
        <template #heading>Start New Session</template>
        Select collection to use <!-- TODO: Add dropdown with collection options [Coll_1, Coll_2, ...]. -->
    </StartItem>

    <StartItem>
        <template #icon>
            <ToolingIcon />
        </template>
        <template #heading>Open Last Session</template>
    </StartItem>

    <StartItem>
        <template #icon>
            <EcosystemIcon />
        </template>
        <template #heading>View Previous Sessions</template>
        <!-- TODO: New page with sessions -->
        Load previous sessions, or combine sessions to create a new session.
    </StartItem>

</template>

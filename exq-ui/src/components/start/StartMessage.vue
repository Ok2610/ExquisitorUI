<script setup lang="ts">
interface Props {
    msg: string,
    qst?: string
}
defineProps<Props>()
// defineProps<{
//     msg: string
// }>()
</script>

<template>
    <div class="greetings">
        <h1 class="green">{{ msg }}</h1>
        <h3 class="green">{{ qst }}</h3>
    </div>
</template>

<style scoped>
h1 {
    font-weight: 500;
    font-size: 2rem;
    position: relative;
    top: -10px;
}

h3 {
    font-size: 1.4rem;
}

.greetings h1,
.greetings h3 {
    text-align: center;
}

@media (min-width: 1024px) {
    .greetings h1,
    .greetings h3 {
        text-align: left;
    }
}
</style>

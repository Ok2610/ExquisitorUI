<script setup lang="ts">
interface Props {
    msg: string,
    qst?: string
}
defineProps<Props>()
</script>

<template>
    <div class="greetings">
        <h1 class="green">{{ msg }}</h1>
        <h3 class="green">{{ qst }}</h3>
    </div>
</template>

<style scoped>
h1 {
    font-weight: 600;
    font-size: 2rem;
    position: relative;
    top: -10px;
}

h3 {
    font-size: 1.4rem;
}

.greetings h1,
.greetings h3 {
    text-align: left;
}

</style>

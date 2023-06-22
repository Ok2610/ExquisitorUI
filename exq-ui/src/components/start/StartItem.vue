<script setup lang="ts">
defineProps<{
    zLevel: number
}>()
</script>

<template>
    <div class="item">
        <button>
            <slot name="icon"></slot>
        </button>
        <div class="details">
            <h3>
                <slot name="heading"></slot>
            </h3>
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.item {
    position: relative;
    margin-top: 2rem;
    display: flex;
    z-index: var(--z-level);
    padding: 0.4rem 0 1rem var(--section-gap);
}

.details {
    flex: 1;
    margin-left: 1rem;
}

button {
    display: flex;
    place-items: center;
    place-content: center;
    width: 64px;
    height: 64px;
    position: absolute;
    left: -20px;
    border: 1px solid var(--color-border);
    border-radius: 8px;

    /* color: var(--color-text); */
}

h3 {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
    color: var(--color-heading);
}

</style>

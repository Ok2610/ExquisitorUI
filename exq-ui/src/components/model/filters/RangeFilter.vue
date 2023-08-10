<script setup lang="ts">
import { ref } from 'vue';


interface Props {
    name : string
    range : [number,number]
}
const props = defineProps<Props>()

const emit = defineEmits(['valueUpdate'])

function valueUpdate() {
    emit('valueUpdate', values.value)
}

const values = ref(props.range)
</script>

<template>
    <v-card color="white">
        <v-card-title class="text-body-1">
            {{ name }}
        </v-card-title>
        <v-card-text class="ma-0 pa-0 mb-2">
            <v-range-slider
             strict
             v-model="values"
             step="1"
             :min="range[0]"
             :max="range[1]"
             hide-details
             color="blue-grey-lighten-4"
             @change="valueUpdate"
            >
                <template v-slot:prepend>
                    <v-text-field
                        :model-value="values[0]"
                        hide-details
                        variant="underlined"
                    />
                </template>
                <template v-slot:append>
                    <v-text-field
                        :model-value="values[1]"
                        hide-details
                        variant="underlined"
                    />
                </template>

            </v-range-slider>
        </v-card-text>
    </v-card>
</template>

<style scoped>
.v-card-title {
    color: black;
}
.v-text-field :deep(.v-field__input) {
    padding: 0px;
    margin: 0px;
    max-height: fit-content;
    min-height: 0px;
}
.v-text-field :deep(input) {
    text-align: center;
}
</style>
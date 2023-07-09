<script setup lang="ts">
import { useModelStore } from '@/stores/model';
import type Model from '@/types/model';
import { computed, ref } from 'vue';
import EditTextField from '../general/EditTextField.vue';

interface Props {
    modelId: number
}
const compProps = defineProps<Props>()

const modelStore = useModelStore()
let model : Model = modelStore.getModel(compProps.modelId)

function changeModelName(newName: string) {
    modelStore.changeName(model, newName)
}

const dialog = ref(false)

const emit = defineEmits(['submit'])

</script>

<template>
    <v-dialog
     v-model="dialog"
     width="50%">
        <template v-slot:activator="{ props }">
            <v-btn
             color="black"
             icon="mdi-cog-outline"
             v-bind="props"
             />
        </template>
        <v-card class="bg-indigo text-center">
            <v-card-title class="mb-2">
                Settings for {{ model.name }}
            </v-card-title>
            <v-card-actions>
                <edit-text-field 
                 :text="model.name"
                 label="Name"
                 @change="changeModelName"
                 />
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>

</style>
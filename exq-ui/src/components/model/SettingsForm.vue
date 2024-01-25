<script setup lang="ts">
import { useModelStore } from '@/stores/models';
import type Model from '@/types/model';
import { computed, ref } from 'vue';
import EditTextField from '../general/EditTextField.vue';
import { submitText } from '@/services/ExquisitorAPI';
import { useSessionStore } from '@/stores/sessions';

interface Props {
    currentModel: Model
}
const settingsProps = defineProps<Props>()

const modelStore = useModelStore()
// let model : Model = modelStore.getModel(settingsProps.modelId)

function changeModelName(newName: string) {
    modelStore.changeName(settingsProps.currentModel, newName)
}

const qaAnswer = ref('')

function submitTextAnswerVBS() {
    const requestObject = {session: useSessionStore().getSession, model: settingsProps.currentModel.id, text: qaAnswer.value, evalId: useSessionStore().evalId}
    console.log(requestObject)
    submitText(requestObject)
    snack()
    qaAnswer.value = ''
}

const dialog = ref(false)

// const emit = defineEmits(['submit'])
const snackbar = ref(false)
const snackTimeout = ref(3000)
const snackColor = ref('white')
const text = ref('')
function snack() {
    snackbar.value = true
    snackColor.value = 'success'
    text.value = 'Submitted answer "' + qaAnswer.value + '".'
}
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
        <v-card class="bg-indigo text-center ma-2">
            <v-card-title class="mb-2">
                Settings for {{ currentModel.name }}
            </v-card-title>
            <v-card-actions>
                <edit-text-field 
                 :text="currentModel.name"
                 label="Name"
                 @change="changeModelName"
                 /> 
            </v-card-actions>
        </v-card>
        <v-card class="bg-indigo text-center ma-2">
            <v-card-title class="mb-2">
                Q&A Answer (VBS)
            </v-card-title>
                <v-text-field
                 v-model="qaAnswer"
                 label="Q&A Answer"
                />
                <v-btn 
                 class="mb-3"
                 icon="mdi-check-underline"
                 location="bottom center"
                 @click="submitTextAnswerVBS">
                </v-btn>
        </v-card>
    </v-dialog>
    <v-snackbar
        v-model="snackbar"
        :timeout="snackTimeout"
        location="bottom center"
        :color="snackColor"
    >
        {{ text }}
        <template v-slot:actions>
            <v-btn
            variant="text"
            @click="snackbar=false"
            icon="mdi-close"
            />
        </template>
    </v-snackbar>
</template>

<style scoped>

</style>
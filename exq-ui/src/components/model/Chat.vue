<script lang="ts" setup>
import { searchVLM } from '@/services/ExquisitorAPI';
import { useConversationStore } from '@/stores/conversations';
import type { ChatEntry } from '@/types/chat';
import { ItemButton, type ItemButtons } from '@/types/mediaitem';
import { reactive, ref } from 'vue';
import Item from '@/components/model/Item.vue';

interface Props {
    modelId: number
}
const props = defineProps<Props>()

const convStore = useConversationStore()

const loaded = ref(false)
const loading = ref(false)

const buttonSet = new Set<ItemButton>()
buttonSet.add(ItemButton.Pos)
buttonSet.add(ItemButton.Neg)
buttonSet.add(ItemButton.Sub)
const buttons : ItemButtons = { buttons: buttonSet }

const chatEntries : ChatEntry[] = reactive([])
convStore.createConversation(props.modelId)

const query = ref('')
async function search() {
    loading.value = true
    const entry = await searchVLM({query: query.value}).then((res) => {
        loading.value = false
        loaded.value = true
        return res
    })
    chatEntries.push(entry)
    convStore.addConversation(props.modelId, entry)
}

</script>

<template>
    <v-container class="fill-height d-block">
        <v-row class="fill-heigt pb-15">
            <v-col class="fill-height">
                <div v-for="(item,index) in chatEntries" key="index">
                    <div class="justify-end">
                        <span class="blue--text">{{ item.userMsg }}</span>
                    </div>
                    <template v-if="Array.isArray(item.vlmResponse)">
                        <v-row>
                            <v-col v-for="it in item.vlmResponse" cols="3">
                                <item 
                                    :buttons="buttons" 
                                    :item-id="it"
                                    :model-id="modelId"
                                    :provided="false"
                                    :overlay="true"
                                />
                            </v-col>
                        </v-row>
                    </template>
                    <div v-else>
                        <span class="green--text mr-3">{{ item.vlmResponse }}</span>
                    </div>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                 v-model="query"
                 label="What are you looking for?"
                 density="compact"
                 hide-details
                 :loading="loading"
                 append-inner-icon="mdi-magnify"
                 @click:append-inner="search"
                 @keydown.enter="search"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>

</style>
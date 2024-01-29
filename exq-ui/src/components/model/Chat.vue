<script lang="ts" setup>
import { searchVLM } from '@/services/ExquisitorAPI';
import { useConversationStore } from '@/stores/conversations';
import type { ChatEntryQueryText } from '@/types/chat';
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

const chatEntries : ChatEntryQueryText[] = reactive([])
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
    <v-container class="d-block" align="center">
        <v-virtual-scroll
         class="mt-10"
         :items="chatEntries"
         height="75vh"
         width="40vw"
        >
            <template v-slot:default="{ item }">
                <v-list-item>
                    <template v-slot:append>
                        <div class="user-bubble" >{{ item.userQuery }}</div>
                    </template>
                </v-list-item>
                <v-row class="ma-1">
                    <v-col v-for="it in item.vlmResults" cols="3">
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
        </v-virtual-scroll>
        <v-text-field
         v-model="query"
         class="mt-10"
         label="What are you looking for?"
         density="compact"
         hide-details
         :loading="loading"
         append-inner-icon="mdi-magnify"
         @click:append-inner="search"
         @keydown.enter="search"
        />
    </v-container>
</template>

<style scoped>
.user-bubble {
  /* (A1) FONT & COLORS */
  font-size: 1.2em;
  color: #fff;
  background: #7a3992;

  /* (A2) DIMENSIONS */
  padding: 15px;
  border-radius: 10px;
  max-width: 600px;
}

.v-virtual-scroll {
    padding: 5px;
    border-radius: 10px;
    border-color: cadetblue;
    border: solid;
}
</style>
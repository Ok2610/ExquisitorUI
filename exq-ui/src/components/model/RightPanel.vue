<script setup lang="ts">
import { useItemStore } from '@/stores/items';
import { ILSets, ItemButton, type ItemButtons } from '@/types/mediaitem';
import { computed, reactive, ref } from 'vue';
import Item from '@/components/model/Item.vue';
import type MediaItem from '@/types/mediaitem';


interface Props {
    modelId: number
}
const props = defineProps<Props>()

const itemStore = useItemStore()
const { getSetItems } = itemStore

const posButtonSet = new Set<ItemButton>()
posButtonSet.add(ItemButton.Neg)
posButtonSet.add(ItemButton.Ignore)
posButtonSet.add(ItemButton.Sub)
const posButtons : ItemButtons = { buttons: posButtonSet }

const negButtonSet = new Set<ItemButton>()
negButtonSet.add(ItemButton.Pos)
negButtonSet.add(ItemButton.Ignore)
negButtonSet.add(ItemButton.Sub)
const negButtons : ItemButtons = { buttons: negButtonSet }

const histButtonSet = new Set<ItemButton>()
histButtonSet.add(ItemButton.Neg)
histButtonSet.add(ItemButton.Sub)
const histButtons : ItemButtons = { buttons: histButtonSet }

const posToggle = ref(false)
const negToggle = ref(false)
const histToggle = ref(false)

const sets = reactive({
    positives : [] as MediaItem[],
    negatives : [] as MediaItem[],
    history : [] as MediaItem[],
})

function getPositives() {
    sets.positives = getSetItems(props.modelId, ILSets.Positives)
}

function getNegatives() {
    sets.negatives = getSetItems(props.modelId, ILSets.Negatives)
}

function getHistory() {
    sets.history = getSetItems(props.modelId, ILSets.History)
}

const posUpdate = computed(() => getPositives())
const negUpdate = computed(() => getNegatives())
const histUpdate = computed(() => getHistory())
</script>

<template>
    <v-navigation-drawer
     theme="dark"
     location="right"
     rail
    >
        <v-list>
            <v-list-item
             prepend-icon="mdi-thumb-up-outline"
             @click="console.log('clicked positives'); posToggle = !posToggle; getPositives()"
            >
            </v-list-item>

            <v-divider :thickness="30" class="border-opacity-0"></v-divider>

            <v-list-item
             prepend-icon="mdi-thumb-down-outline"
             @click="console.log('clicked negatives'); negToggle = !negToggle; getNegatives()"
            >
            </v-list-item>

            <v-divider :thickness="30" class="border-opacity-0"></v-divider>

            <v-list-item
             prepend-icon="mdi-history"
             @click="console.log('clicked history'); histToggle = !histToggle; getHistory()"
            >
            </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer 
     v-if="posToggle"
     location="right"
     color="success"
     >
        <!-- TODO: Move this part into generic component -->
        <v-list :v-model="posUpdate">
            <v-list-item v-for="it in sets.positives">
                <item 
                 :buttons="posButtons" 
                 :item="it"
                 :model-id="modelId"
                />
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
    
    <v-navigation-drawer 
     v-if="negToggle"
     location="right"
     color="error"
     >
        <v-list :v-model="negUpdate">
            <v-list-item v-for="it in sets.negatives">
                <item 
                 :buttons="negButtons" 
                 :item="it"
                 :model-id="modelId"
                />
            </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer 
     v-if="histToggle"
     location="right"
     color="grey"
     >
        <v-list :v-model="histUpdate">
            <v-list-item v-for="it in sets.history">
                <item 
                 :buttons="histButtons" 
                 :item="it"
                 :model-id="modelId"
                />
            </v-list-item>
        </v-list>
    </v-navigation-drawer>

</template>

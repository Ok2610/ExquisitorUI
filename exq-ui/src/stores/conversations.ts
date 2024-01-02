import type { ChatEntry } from "@/types/chat";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useConversationStore = defineStore('conversations', () => {
    const conversations : Map<number,ChatEntry[]> = reactive(new Map<number,ChatEntry[]>)

    function createConversation(modelId: number) : void {
        conversations.set(modelId,[])
    }

    function getConversation(modelId: number) : ChatEntry[] {
        if (conversations.has(modelId)) {
            return conversations.get(modelId)!
        } else {
            return []
        }
    }

    function addConversation(modelId: number, entry: ChatEntry) {
        conversations.get(modelId)!.push(entry)
    }

    return {
        createConversation,
        getConversation,
        addConversation
    }
})
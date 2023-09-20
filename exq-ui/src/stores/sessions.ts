import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useSessionStore = defineStore('sessions', () => {
    const session = ref('')
    
    const getSession = computed(() => { return session.value })

    function setSession(s: string) {
        session.value = s
    }

    return { setSession, getSession }
})
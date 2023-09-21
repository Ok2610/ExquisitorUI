import { defineStore } from "pinia";
import { reactive } from "vue";
import { computed, ref } from "vue";

export const useSessionStore = defineStore('sessions', () => {
    const session = ref('')
    
    
    const getSession = computed(() => { return session.value })

    const itemHW = reactive({ maxHeight: (window.innerHeight * 0.25)+'px', maxWidth: (window.innerWidth * 0.3)+'px' })

    function setSession(s: string) {
        session.value = s
    }

    return { setSession, getSession, itemHW }
})
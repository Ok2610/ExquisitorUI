import { defineStore } from "pinia";
import { reactive } from "vue";
import { computed, ref } from "vue";

export const useSessionStore = defineStore('sessions', () => {
    const session = ref('')
    
    //const evalId = ref('8ef594aa-e060-4773-9f95-768e12fd11dd') // qatest
    const evalId = ref('be4f23a6-9064-424b-82d0-9eb5fdd68d1d') // AVSnoseglong
    
    const getSession = computed(() => { return session.value })

    const itemHW = reactive({ maxHeight: (window.innerHeight * 0.25)+'px', maxWidth: (window.innerWidth * 0.3)+'px' })

    function setSession(s: string) {
        session.value = s
    }

    function setEvaluationId(s: string) {
        evalId.value = s
    }

    return { setSession, getSession, itemHW, evalId, setEvaluationId}
})
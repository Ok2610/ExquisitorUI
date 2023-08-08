import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import type Model from '@/types/model'
import { ResourceValues, type GridGroup, type Settings } from '@/types/model'
import { initModel, removeModel } from '@/services/MockExquisitorAPI'

export const useModelStore = defineStore('model', () => {
    const nModels = ref(0)
    const models : Model[] = reactive([])

    function defaultSettings() : Settings {
        return { 
            groups: [{
                id: 0, 
                name: 'RF', 
                itemsToShow: 20
            }], 
            resources: ResourceValues.Low 
        }
    }

    async function addModel(session: string, name?: string) {
        const mid = ref(nModels.value)
        const mname = ref('Model ' + mid.value)
        const settings = computed(() => defaultSettings())
        const groups = await initModel({ modelId: mid.value, session: session, groups: settings.value.groups })
        models.push({ 
            session: session, 
            id: mid.value, 
            name: mname.value, 
            settings: settings.value,
            grid: groups.groups
        })
        nModels.value++
    }
    
    async function deleteModel(session: string, model: Model) {
        let indx = models.findIndex(e => e.id === model.id && e.name === model.name)
        let m : Model = models.splice(indx, 1)[0]
        await removeModel({ session: session, modelId: model.id })
        console.log('Removed Model:', m.id)
        console.log(m)
    }
    
    // Load models from a saved file (assumed implementation)
    function initLoadModels(modelsToLoad: Model[]) {
        models.splice(0,models.length)
        nModels.value = 0
        modelsToLoad.forEach(m => {
            const mid = ref(nModels.value++)
            m.id = mid.value
            models.push(m)
        })
    }
    
    function loadModel(model: Model) {
        nModels.value++
        model.id = nModels.value
        models.push(model)
    }
    
    function getModel(id: number) : Model {
        return models.filter(e => e.id === id)[0]
    }
    
    function getModelGrid(id: number) : GridGroup[] | undefined {
        return models[id].grid
    }
    
    function changeName(model: Model, newName: string) {
        let indx = models.findIndex(e => e.id === model.id && e.name === model.name)
        models[indx].name = newName
    }

    return { models, addModel, deleteModel, initLoadModels, loadModel, getModel, changeName}
})
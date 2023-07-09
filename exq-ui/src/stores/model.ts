import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import type Model from '@/types/model'
import { ResourceValues, type Settings } from '@/types/model'

function defaultSettings() : Settings {
    return { itemsToShow: 20, resources: ResourceValues.Low }   
}

export const useModelStore = defineStore('model', () => {
    const nModels = ref(0)
    const modelName = ref('Model ' + nModels.value)
    const models : Model[] = reactive([{ id: nModels.value, name: modelName.value, settings: defaultSettings() }])

    function addModel(name? : string) {
        nModels.value++
        const mid = ref(nModels.value)
        const mname = ref('Model ' + mid.value)
        models.push({ id: mid.value, name: mname.value, settings: defaultSettings() })
    }
    
    function deleteModel(model: Model) {
        let indx = models.findIndex(e => e.id === model.id && e.name === model.name)
        let m : Model = models.splice(indx, 1)[0]
        console.log('Removed Model:', m.id)
        console.log(m)
    }
    
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
    
    function changeName(model: Model, newName: string) {
        let indx = models.findIndex(e => e.id === model.id && e.name === model.name)
        models[indx].name = newName
    }

    return { models, addModel, deleteModel, initLoadModels, loadModel, getModel, changeName}
})

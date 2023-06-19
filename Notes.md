# Vuejs App

**Composition API:** 
```<script setup> <template> <style>```

**Variable types**
* ```let count = 0``` - Regular mutable variable
* ```const count = ref(0)``` - Reference, use ```.value``` to access and update
* ```const counter = reactive({ count: 0 })``` - Reactive reference will trigger a render when changed, use ```counter.count``` to access and update value

**Attribute Binding** (```:id, :class```)
* Useful for changing Dark/Light mode, Show stats, etc.

**Conditional Rendering** (```v-if, v-else, v-else-if```)
* Going to use this a lot
* Render only certain buttons on "HoverImage" (dreadful in React implementation)

**Event Listener** (```@click, v-model```)
* ```v-model``` for checkboxes/radio buttons/input

**List Rendering** (```<li v-for="image in images" :key="image.id">```)

**Computed Properties** (```const images = computed(() => { return x ? y : z... })```)
* Could actually keep a list of all images with values such as: 0 = suggestion, 1 = pos, 2 = neg, 3 = seen

**Lifecycle hooks** (```onMounted, onUpdated, onUnMounted```)
* For better overview see: https://vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram

**Watchers** (```watch(count, (newCount) => { //Do Something... } | funcName)```)
* Can be used to set a callback on a ```ref```

**Components**
* Work similar to React, each one can have ```props```
* They can be imported and used in ```<template>```
* To pass a variable to ```props``` use ```:prop_name="ref"```
* A child component can use ```emit()``` to signal the parent

```
Child:
<script setup>
    const emit = defineEmits(['response'])

    emit('response', 'hello from child')
</script>

Parent:
<template>
    <ChildComp @response="(msg) => childMsg = msg" />
</template>
```

**Slots**
* These can be used in the child component with ```<slot></slot>```
* They are used to pass HTML/template
```
Parent:
<ChildComponent>
    <strong> {{ parentRef }} </strong>
</ChildComponent>
```
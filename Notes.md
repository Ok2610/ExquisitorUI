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

**Stores**
See stores/counter.ts
In Setup Stores:
* ```ref()```s become state properties
* ```computed()```s become getters
* ```function()```s become actions


# Exquisitor

## Welcome / Start options

### New Session with existing collection(s)
Start new session

### Open Last Session
Load the latest saved session for user

### View Previous Sessions/Models
Opens a new modal with previous [Sessions | Models]
Options to load session or a model from a session
Start new session with models from different sessions

### Add Collection
TBD

## Model Tabs
The main view for an Exquisitor session is the Model page
For a new session an untitled Model page is presented
Additional Models can be added by using the tabs on top of the session page
Save/Restart Session buttons

## Grid
The Grid is the main component of the Model page
It consists of groups of items presented on multiple rows
The number of rows is determined by the screen size or through user input
Grid: GridGroups[]
GridGroup: Name, Items[], UpdateFunction, Color?, Number of Suggestions?
UpdateFunction is a stored function

### Media Item
Relevant Metadata Information
ID
Video ID
Media
Paths?

## Relevance Feedback Overlays
Overlays relating to the relevance feedback process

### Pos/Neg/History Sets
Views that allow the user to look through the sets to view items or adjust the model

### Setings
General options for Exquisitor:

* Number of suggestions
* Resource usage: [Low (1 CPU), Medium (Half), High (All available)]
* Modalities
* Grid Groups to use

### Statistics
TBD

## Search Overlays

### Filters
All data related filters
Option to make this overlay sticky
Filter types:
* Single: Only 1 value can be set for the filter (v-combobox clearable)
* Multi: Multiple values can be set for this filter (v-combobox chips multiple clearable)
* NumberRange: Filter with option of range value such as hours (v-range-slider)
* NumberMultiRange: Filter with option for adding multiple range values (from m to n and from x to y)
* LabelRange: Range values are labels (thumb-label)
* LabelMultiRange: Range values are labels (thumb-label)
    * All ranges could have multi option?
* Count: Only 1 value with a corresponding count can be set
* MultiCount: Multiple values with different counts can be set


### Search
The overlay takes half the screen
Multiple search can take place using tabs in the overlay

### Submission (Competition only)
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { CoMediaPlay, CoReload, CoList } from 'oh-vue-icons/icons'
addIcons(CoMediaPlay, CoReload, CoList)

import VueClickAway from 'vue3-click-away'

const app = createApp(App)

app.use(createPinia())
app.component("v-icon", OhVueIcon)
app.use(VueClickAway)

app.mount('#app')

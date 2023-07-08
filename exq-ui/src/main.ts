import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { CoMediaPlay, CoReload, CoList } from 'oh-vue-icons/icons'
addIcons(CoMediaPlay, CoReload, CoList)

import VueClickAway from 'vue3-click-away'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  }
})


const app = createApp(App)

app.use(createPinia())
app.component("v-icon", OhVueIcon)
app.use(VueClickAway)
app.use(vuetify)

app.mount('#app')

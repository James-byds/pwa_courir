import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

import 'bulma/css/bulma.min.css'
import '@/assets/main.scss'

//font awesome imports 
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas, fab, far)

app.component('font-awesome-icon', FontAwesomeIcon)
//syntaxe pour ajouter un component global dans vue
//<font-awesome-icon :icon="['fas', 'user']" />
//valeur 1 pour le style, valeur 2 pour le nom

app.use(createPinia())
app.use(router)

app.mount('#app')

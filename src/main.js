import { createApp } from 'vue'
import App from './App.vue'
import "./index.css"
import WebFont from 'webfontloader'

createApp(App).mount('#app')

WebFont.load({
  google: {
    families: ['Vidaloka:400&display=swap'],
  },
})
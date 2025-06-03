import './assets/main.css'
import "primevue/resources/themes/aura-light-green/theme.css";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')

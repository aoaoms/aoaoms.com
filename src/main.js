import '@/assets/css/main.css'

// import { createApp } from 'vue'
// import { createPinia } from 'pinia'

import App from './App.vue'
// import router from './router'

import { createRouter, createWebHistory } from 'vue-router'
// vite-plugin-pages route gen
import routes from "pages-generated";

import { setupLayouts } from 'virtual:generated-layouts'

// bootstrap color mod
const theme = localStorage.getItem('theme')
if (theme){
    document.documentElement.setAttribute('data-bs-theme', theme)
} else {
    localStorage.setItem('theme', 'light')
    document.documentElement.setAttribute('data-bs-theme', 'light')
}

const layoutRoutes = setupLayouts(routes)
const app = createApp(App)

// fromat date from md's frontmatter i.e. 22024-02-22 note: not with quote mark
app.config.globalProperties.$fromatDateFromMdMatter = (date) =>{
    let time = new Date(new Date(date).getTime())
    return time.toUTCString()
}

// app.use(createPinia())
app.use(createRouter({
    history: createWebHistory(),
    routes: layoutRoutes,
}))
console.log(routes)
app.mount('#app')

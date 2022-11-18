import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import store from './store'
import App from '@/App.vue'
import router from './router'


//导入All图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/src/index.scss'
import 'element-plus/dist/index.css'


const app=createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(store)
app.use(ElementPlus)
app.use(router).mount('#app')
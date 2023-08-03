import './assets/main.css'

// 引入全局样式
import '@/styles/index.less'

// 引入阿里图标
import '@/assets/font/iconfont.css'

import { createPinia } from 'pinia';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.use(createPinia())

app.mount('#app')

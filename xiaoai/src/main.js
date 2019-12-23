import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import service from "./http"
import dayjs from 'dayjs'
import VCharts from 'v-charts'
import mavonEditor from 'mavon-editor'
import VueCropper from 'vue-cropper'
import JsonExcel from 'vue-json-excel'

Vue.component('downloadExcel', JsonExcel)
Vue.use(ElementUI)
Vue.use(dayjs)
Vue.use(VCharts)
Vue.use(mavonEditor)
Vue.use(VueCropper)
    // 把service对象挂载在Vue的原型对象上
    // 每一个组件都可以使用
Vue.prototype.$axios = service
Vue.prototype.$dayjs = dayjs
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
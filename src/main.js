import Vue from 'vue'
import vueRouter from 'vue-router'
import router from './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(vueRouter)
Vue.use(ElementUI)
window.vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})

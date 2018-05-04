import Router from 'vue-router'
import routes from './routes'
// Vue.use(Router)
console.log('router index')
export default new Router({
  mode: 'hash',
  routes: routes
})

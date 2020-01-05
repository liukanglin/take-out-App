import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './mock/mockServe' // 加载mockServer即可
import VueLazyload from 'vue-lazyload'

import loading from './common/imgs/loading.gif'
import './filters' // 加载过滤器

Vue.config.productionTip = false
// 图片懒加载
Vue.use(VueLazyload, {
  loading
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../../components/css/reset.css'
// import * as wdui from 'wdui' //整体引入
// import 'wdui/lib/styles/theme-default/index.css' //引入样式文件
import './assets/index.scss'

// import '../../components/css/green.scss'
import '../../components/css/blue.scss'

// Vue.use(wdui)

import {Toast, Button} from 'wdui'

Vue.component(Button.name, Button)
Vue.$Toast = Vue.prototype.$Toast = Toast



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

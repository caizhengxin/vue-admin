// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import 'element-ui/lib/theme-chalk/display.css'
import Echarts from 'echarts'
import axios from 'axios'
import Mock from './mock'


Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$Echarts = Echarts
Vue.prototype.$http = axios

Mock.AnalogData()

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

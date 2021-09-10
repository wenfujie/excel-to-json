/*
 * @Author: your name
 * @Date: 2021-04-28 21:15:21
 * @LastEditTime: 2021-06-29 11:46:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \excel-to-json\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
// import shareHtml from './utils/generateHtml';
// Vue.use(shareHtml)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

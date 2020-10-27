import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
//import router from './router'
//import { iconsSet as icons } from './assets/icons/icons.js'

Vue.config.productionTip = false

new Vue({
  vuetify,
  //icons,
  render: h => h(App)
}).$mount('#app')


new Vue({
  //el: '#app',
  //router,
  //store,
  //icons,
  //template: '<App/>',
  //components: {
  //  App
  //}
})
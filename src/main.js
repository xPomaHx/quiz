import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

import VueYandexMetrika from 'vue-yandex-metrika'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')


Vue.use(VueYandexMetrika, {
  id: 54053590,
  //debug: true,
  env: 'production'
});
// all imports are here
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
//imports end here

Vue.config.productionTip = false

new Vue({ //creating Vue instance with requirements here store as a state and vuetify as a front-end framework
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

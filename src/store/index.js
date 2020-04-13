import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { // modules can contain module of a perticular state
    users
  }
})

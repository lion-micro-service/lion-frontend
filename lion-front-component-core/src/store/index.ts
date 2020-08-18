import Vue from 'vue'
import Vuex from 'vuex'

import security from './modules/security'

Vue.use(Vuex)
export interface RootState {
}

export default new Vuex.Store<RootState>({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    security
  }
})

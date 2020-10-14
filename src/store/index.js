import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
Vue.use(Vuex)

const state = {
    cartList: []
}

export default new Vuex.Store({
  state,
  mutations,
  //actions写复杂的方法,可以分发任务
  actions,
  getters
})

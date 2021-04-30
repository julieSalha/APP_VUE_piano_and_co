import Vuex from 'vuex'
import Vue from 'vue'

import Amplitude from 'amplitudejs'

import profiles from '@/store/modules/profiles'
import player from '@/store/modules/player'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    profiles,
    player
  }
})

export const state = () => ({
  profile: {}
})

export const mutations = {
  SET_PROFILE(state, val) {
      state.profile = val
  }
}

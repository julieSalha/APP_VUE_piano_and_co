import axios from 'axios'

const state = {
  allProfiles: [],
  profile: null,
}

const getters = {
  getAllProfiles: state => state.allProfiles,
  getProfile: state => state.profile
}

const mutations = {
  setAllProfiles (state, allProfiles) {
    state.allProfiles = allProfiles
  },
  setProfile (state, profile) {
    state.profile = profile
  }
}

const actions = {
  async fetchAllProfiles ({ commit }) {
    const { data } = await axios.get('http://localhost:9229/api/user')
    commit('setAllProfiles', data)
  },
  async fetchProfile ({ commit }, id) {
    const { data } = await axios.get(`http://localhost:9229/api/user/${id}`)
    commit('setProfile', data)
  },
  async createProfile ({ commit }, data) {
    await axios.post(`http://localhost:3000/profiles`, {
      ...data
    })
  },
  async editProfile ({ commit }, data) {
    await axios.patch(`http://localhost:3000/profiles/${data.id}`, {
      ...data
    })
  },
  async deleteProfile ({ commit }, id) {
    await axios.delete(`http://localhost:3000/profiles/${id}`)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

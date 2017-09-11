import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    appToken: 0,
    allQuestions: ''
  },
  mutations: {
    setAppToken (state, payload) {
      state.appToken = payload
    },
    setAllQuestions (state, payload) {
      state.allQuestions = payload
    }
  },
  actions: {
    getAllQuestions ({commit}) {
      axios.get('http://localhost:3000/questions')
      .then(res => {
        commit('setAllQuestions', res.data)
      })
      .catch(err => console.log(err))
    }
  }
})

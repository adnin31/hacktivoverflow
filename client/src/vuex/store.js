import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwtDecoded from 'jwt-decode'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    appToken: null,
    allQuestions: '',
    detailQuestion: '',
    parseToken: {}
  },
  mutations: {
    setAppToken (state, payload) {
      state.appToken = payload
      state.parseToken = jwtDecoded(payload)
    },
    setAllQuestions (state, payload) {
      state.allQuestions = payload.reverse()
    },
    removeAppToken (state) {
      state.appToken = null
      state.parseToken = {}
    },
    setDetailQuestion (state, payload) {
      state.detailQuestion = payload
    }

  },
  actions: {
    getAllQuestions ({commit}) {
      axios.get('http://localhost:3000/questions')
      .then(res => {
        commit('setAllQuestions', res.data)
      })
      .catch(err => console.log(err))
    },
    getDetailQuestion (context, id) {
      console.log('masuk detailQuestion')
      console.log(id)
      axios.get(`http://localhost:3000/questions/${id}`)
      .then(res => {
        context.commit('setDetailQuestion', res.data)
      })
      .catch(err => console.log(err))
    }
  }
})

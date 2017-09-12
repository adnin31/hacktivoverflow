import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    appToken: localStorage.getItem('token'),
    allQuestions: '',
    detailQuestion: ''
  },
  mutations: {
    setAppToken (state, payload) {
      state.appToken = payload
    },
    setAllQuestions (state, payload) {
      state.allQuestions = payload.reverse()
    },
    removeAppToken (state) {
      state.appToken = null
    },
    setDetailQuestion (state, payload) {
      state.detailQuestion = payload
    }

  },
  actions: {
    getAllQuestions ({commit}) {
      console.log('masuk getAllQuestions')
      axios.get('http://localhost:3000/questions')
      .then(res => {
        commit('setAllQuestions', res.data)
      })
      .catch(err => console.log(err))
    },
    getDetailQuestions (id) {
      console.log('masuk detailQuestion')
      axios.get(`http://localhost:3000/questions/${id}`)
      .then(res => {
        id.commit('')
      })
    }
  }
})

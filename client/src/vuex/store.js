import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwtDecoded from 'jwt-decode'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    appToken: null,
    allQuestions: '',
    detailQuestion: {
      question: '',
      content: '',
      author: ''
    },
    parseToken: '',
    detailId: ''
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
    },
    setCreatedList (state) {
      state.appToken = localStorage.getItem('token')
      if (localStorage.getItem('token') != null) {
        state.parseToken = jwtDecoded(localStorage.getItem('token'))
      }
    },
    setIdDetail (state, payload) {
      state.detailId = payload
    }

  },
  actions: {
    getAllQuestions ({commit}) {
      console.log('masuk ke allQuestions')
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
        console.log(res.data)
        context.commit('setDetailQuestion', res.data)
      })
      .catch(err => console.log(err))
    }
  }
})

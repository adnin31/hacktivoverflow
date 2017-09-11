import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import DetailQuestion from '@/components/DetailQuestion'
import ListQuestions from '@/components/ListQuestions'
import AddQuestions from '@/components/AddQuestions'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          component: ListQuestions
        },
        {
          path: 'new-question',
          component: AddQuestions
        },
        {
          path: ':id',
          component: DetailQuestion
        }
      ]
    }
  ]
})

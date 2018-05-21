import Vue from 'vue'
import Router from 'vue-router'
import article from '@/components/article'
import user from '@/components/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/user'
    },
    {
      path: '/article',
      component: article
    },
    {
      path: '/user',
      component: user
    }
  ]
})

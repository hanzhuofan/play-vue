import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Activiti from '@/components/Activiti'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Activiti',
      component: Activiti
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})

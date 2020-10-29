import Vue from 'vue'
import Router from 'vue-router'
import Courses from './pages/Courses.vue'
import Medical from './pages/Medical.vue'
import Timetable from './pages/Timetable.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/Courses',
      name: '',
      component: Courses
    },
    {
      path: '/Medical',
      name: 'medical',
      component: Medical
    },
    {
      path: '/Timetable',
      name: 'timetable',
     
      component: () => import('./pages/Timetable.vue')
    }
  ]
})

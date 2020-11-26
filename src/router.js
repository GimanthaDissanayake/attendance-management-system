import Vue from 'vue'
import Router from 'vue-router'
import ViewCourses from './views/ViewCourses.vue'
import Timetable from './views/Timetable.vue'
import ViewAttendance from './views/ViewAttendance.vue'
import ViewMahapolaEligibility from './views/ViewMahapolaEligibility.vue'
import ViewDetailedAttendance from './views/ViewDetailedAttendance.vue'
import ViewDetailedCourse from './views/ViewDetailedCourse.vue'
import ViewRegisteredStudents from './views/ViewRegisteredStudents.vue'
import ViewAlerts from './views/ViewAlerts.vue'
import MarkAttendance from './views/MarkAttendance.vue'
import RegisterUsers from './views/RegisterUsers.vue'
import SetMRAP from './views/SetMRAP.vue'
import SetMahapolaDuration from './views/SetMahapolaDuration.vue'
import ViewMentorGroups from './views/ViewMentorGroups.vue'
import ViewStudentDetails from './views/ViewStudentDetails.vue'
import ViewAttendanceSheet from './views/ViewAttendanceSheet.vue'
import SendAlert from './views/SendAlert.vue'
import ViewAllStudents from './views/ViewAllStudents.vue'



Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/ViewCourses',
      name: 'viewcourses',
      component: ViewCourses
    },
    {
      path: '/Timetable',
      name: 'timetable',     
      component: Timetable
    },
    {
      path: '/ViewAttendance',
      name: 'viewattendance',
      component: ViewAttendance
    },
    {
      path: '/ViewMahapolaEligibility',
      name: 'viewmahapolaeligibility',
      component: ViewMahapolaEligibility
    },
    {
      path: '/ViewDetailedAttendance',
      name: 'viewdetailedattendance',
      component: ViewDetailedAttendance
    },
    {
      path: '/ViewDetailedCourse',
      name: 'viewdetailedcourse',
      component: ViewDetailedCourse
    },
    {
      path: '/ViewRegisteredStudents',
      name: 'viewregisteredstudents',
      component: ViewRegisteredStudents
    },
    {
      path: '/ViewAlerts',
      name: 'viewalerts',
      component: ViewAlerts
    },
    {
      path: '/MarkAttendance',
      name: 'markattendance',
      component: MarkAttendance
    },
    {
      path: '/RegisterUsers',
      name: 'registerusers',
      component: RegisterUsers
    },
    {
      path: '/SetMRAP',
      name: 'setmrap',
      component: SetMRAP
    },
    {
      path: '/SetMahapolaDuration',
      name: 'setmahapoladuration',
      component: SetMahapolaDuration
    },
    {
      path: '/ViewMentorGroups',
      name: 'viewmentorgroups',
      component: ViewMentorGroups
    },
    {
      path: '/ViewStudentDetails',
      name: 'viewstudentdetails',
      component: ViewStudentDetails
    },
    {
      path: '/ViewAttendanceSheet',
      name: 'viewattendancesheet',
      component: ViewAttendanceSheet
    },
    {
      path: '/SendAlert',
      name: 'sendalert',
      component: SendAlert
    },
    {
      path: '/ViewAllStudents',
      name: 'viewallstudents',
      component: ViewAllStudents
    },
  ]
})

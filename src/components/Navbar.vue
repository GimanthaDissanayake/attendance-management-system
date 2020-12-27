<template>
  <nav fill-height>
    <v-app-bar flat app dark class="primary">
      <v-app-bar-nav-icon @click.stop="drawer=!drawer"></v-app-bar-nav-icon>      
      <!-- <v-toolbar-title>
        Attendance Management System
      </v-toolbar-title> -->
       <v-spacer></v-spacer>
       <span class="nameTxt d-none d-sm-flex">{{user.name }}</span><span class="roleTxt px-md-2 mx-lg-auto d-none d-sm-flex"> , logged in as {{ user.role}}</span>
      <v-badge
          v-show="user.role!='admin'"
          :content="badgeNum"
          v-if="badgeNum > 0"
          overlap
          left
          color="red"
      >
        <v-btn v-show="user.role!='admin'" class="mx-2" color="#DBB2FF" fab small @click="message">
          <v-icon small color="black">mdi-android-messages</v-icon>
        </v-btn>
      </v-badge>

      <v-btn v-if="!badgeNum" v-show="user.role!='admin'" class="mx-2" color="#DBB2FF" fab small @click="message">
          <v-icon small color="black">mdi-android-messages</v-icon>
        </v-btn>

        <v-btn color="#DBB2FF" v-on:click="logout">
          <span class="black--text">Sign Out</span>
          <v-icon color="black" right>mdi-logout-variant</v-icon>
        </v-btn>
    </v-app-bar>
    <v-navigation-drawer app  fill-height v-model="drawer">
      <v-container class="px-md-5 mx-lg-auto">
        <v-row class="px-md-8 mx-lg-auto">
          <v-img src="../assets/logo.png"></v-img>
        </v-row>
        <v-row>
          <span class="px-md-3 text-body-2 text-center">Attendance Management System</span>
        </v-row>
      </v-container>
      
      <v-list nav dense>
        <v-list-item 
          color="primary"
          v-for="item in items"
          v-bind:key="item.title"
          link
          router
          :disabled="checkDisabled"
          :to="item.path"
          v-show="item.access.includes('all') || (item.access.includes(user.role) && item.access.includes('yes'))">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title 
              class="subtitle-2">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-container class="text-caption">
            <v-row >
                <v-divider></v-divider>
            </v-row>         
            <v-row v-if="isStudent">
              <v-col>
                Total Registered Courses for the Current Year
              </v-col>
              <v-col cols="2" md="2" class="primary--text">
                  {{RegisteredCoursesCount}}
              </v-col>
            </v-row>     
            <v-row v-if="isStudent">
              <v-col>
                Total Number of Days Lectures Held
              </v-col>
              <v-col cols="2" md="2" class="primary--text">
                  {{TotalLecturesHeldCount}}
              </v-col>
            </v-row>   
            <v-row v-if="isStudent">
              <v-col>
                Total Participated Lecture Sessions
              </v-col>
              <v-col cols="2" md="2" class="success--text">
                  {{ToalLecturesPresentCount}}
              </v-col>
            </v-row>   
             <v-row v-if="isStudent">
              <v-col>
                Total Absent Lecture Sessions
              </v-col>
              <v-col cols="2" md="2" class="error--text">
                  {{TotalLectureAbsentCount}}
              </v-col>
            </v-row>
            <v-row v-if="isLecturer">
              <v-col>
                Total Courses Conducting for Current Year
              </v-col>
              <v-col cols="2" md="2" class="primary--text">
                  {{TotalCoursesTeaching}}
              </v-col>
            </v-row>   
            <v-row v-if="isLecturer">
              <v-col>
                Total Conducted Lecture Sessions
              </v-col>
              <v-col cols="2" md="2" class="success--text">
                  {{TotalConducted}}
              </v-col>
            </v-row>   
            <!-- <v-row v-if="isMentor">
              <v-col>
                Total Conducted Lecture Sessions
              </v-col>
              <v-col cols="2" md="2" class="success--text">
                  {{TotalMentoringStudents}}
              </v-col>
            </v-row>    -->
            <v-row v-if="isHOD">
              <v-col>
                Total Courses offered by the Department
              </v-col>
              <v-col cols="2" md="2" class="primary--text">
                  {{TotalDepartmentCoursesCount}}
              </v-col>
            </v-row>  
            <v-row v-if="isHOD">
              <v-col>
                Total Worked Days of the Department
              </v-col>
              <v-col cols="2" md="2" class="success--text">
                  {{TotalDepartmentDaysCount}}
              </v-col>
            </v-row> 
          </v-container>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>  
</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations } from 'vuex';
import { navBar } from "../data/data";
export default {
  computed: {
    user(){ 
      return this.$store.state.user;
    },
    checkDisabled(value){
      value.items[4].access = ['student', this.$store.state.mahapola];
      return false;
    }
  },
  data() {
    return {
      drawer: true,
      items: navBar.headers,
      badgeNum:'',
      users:'',
      timer:'',
      role:'',
      isStudent: false,
      RegisteredCoursesCount: 0,
      TotalLecturesHeldCount: 0,
      ToalLecturesPresentCount: 0,
      TotalLectureAbsentCount: 0,
      isLecturer: false,
      TotalCoursesTeaching: 0,
      TotalConducted: 0,
      // isMentor: false,
      // TotalMentoringStudents: 0,
      TotalDepartmentCoursesCount: 0,
      TotalDepartmentDaysCount: 0,
      isHOD: false,
    }
  },
  methods: {
    ...mapGetters(['getUser']),
    ...mapMutations(["removeToken"]),
   async setBadge(){
      this.users = this.getUser();
      this.role = this.users.role;
      const userId = this.user.username;
       const result = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/alert/badge/",{
       userId
       });
         this.badgeNum = result.data.alert.length;
    },
    async setData(){
      //////// TO SET COUNTERS ////////

      const username = this.users.username;

      if(this.role === 'student'){
        //////// TO SET STUDENT COUNTERS ////////
        this.isStudent = true;

        //total registered courses count
        const r1 = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/registered_student/",{
          username
        });
        this.RegisteredCoursesCount = r1.data.count[0][0].count;
        //total number of days lectures were held
        const r2 = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/lecturer_days/",{
          username
        });
        this.TotalLecturesHeldCount = r2.data.count[0][0].count;
        //total present lectures count
        const r3 = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/present_days/",{
          username
        });
        this.ToalLecturesPresentCount = r3.data.count[0][0].count;
        //total absent lectures count
        const r4 = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/absent_days/",{
          username
        });
        this.TotalLectureAbsentCount = r4.data.count[0][0].count;
      }
      else if(this.role === 'lecturer') {
        //////// TO SET Lecturer COUNTERS ////////
        this.isLecturer = true;

        //total course units conducting current year
        const r1 = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/total_courses/",{
          username
        });
        this.TotalCoursesTeaching = r1.data.count[0][0].count;
        //total conducted lecture sessions
        const r2 = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/total_conducted/",{
          username
        });
        this.TotalConducted = r2.data.count[0][0].count;
      }
      else if(this.role === 'mentor') {
        //////// TO SET Lecturer COUNTERS ////////
        this.isLecturer = true;

        //total course units conducting current year
        const r1 = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/total_courses/",{
            username
        });
        this.TotalCoursesTeaching = r1.data.count[0][0].count;
        //total conducted lecture sessions
        const r2 = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/total_conducted/",{
            username
        });
        this.TotalConducted = r2.data.count[0][0].count;
      }
      else if(this.role === 'hod') {
        //////// TO SET Lecturer COUNTERS ////////
        this.isLecturer = true;

        //total course units conducting current year
        const r1 = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/total_courses/",{
          username
        });
        this.TotalCoursesTeaching = r1.data.count[0][0].count;
        //total conducted lecture sessions
        const r2 = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/total_conducted/",{
          username
        });
        this.TotalConducted = r2.data.count[0][0].count;

        //////// TO SET HOD COUNTERS ////////
        this.isHOD = true;
        //total courses offered by department
        const r3 = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/total_dep_courses/",{
          username
        });
        this.TotalDepartmentCoursesCount = r3.data.count[0][0].count;
        //total working days of the department
        const r4 = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/total_dep_days/",{
          username
        });
        this.TotalDepartmentDaysCount = r4.data.count[0][0].count;
      }
      
    },
    logout() {
      if(this.$router.history.current.name === "dashboard")
        this.removeToken();
      else{
        this.$router.push("/");
        this.removeToken();
      }
    },
    message() {
      this.$router.push("./viewAlerts");
    },
    // resetBadge() {
    //   this.setBadge = 0;
    // },
  },
  async mounted(){
    try {
        this.setBadge();
        this.setData();
      } catch(err) {
        console.log(err.toString());
      }
  },
  created() {
    //this.setBadge();
    this.timer = setInterval(this.setBadge, 5000)
    //this.$root.$refs.A = this;
  }, 
}
</script>

<style scoped>
  .nameTxt{
    /* font-family: 'Concert One', cursive; */
    font-size: 18px;
    font-weight: 500;
  }
  .roleTxt{
    /* font-family: 'Concert One', cursive; */
    font-size: 12px;
    text-transform: uppercase;
  }
</style>

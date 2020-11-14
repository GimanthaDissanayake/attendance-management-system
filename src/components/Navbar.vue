<template>
  <nav>
    <v-app-bar flat app dark class="primary">
      <v-app-bar-nav-icon @click.stop="drawer=!drawer"></v-app-bar-nav-icon>      
      <v-toolbar-title>
        Attendance Management System
      </v-toolbar-title>
       <v-spacer></v-spacer>
        <v-btn class="mx-2" color="#DBB2FF" fab small>
          <v-icon small color="black">mdi-android-messages</v-icon>
        </v-btn>
        <v-btn color="#DBB2FF">
          <span class="black--text">Sign Out</span>
          <v-icon color="black" right>mdi-logout-variant</v-icon>
        </v-btn>
    </v-app-bar>
      <v-navigation-drawer app clipped v-model="drawer">
        <v-img src="../assets/logo.png"></v-img>
        <v-list nav dense>
          <v-list-item
            v-for="item in items"
            v-bind:key="item.title"
            link
            v-show="item.access=='all' || item.access.includes('lecturer')">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  </nav>
  
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', path: '', access: 'all'},
        { title: 'Courses', icon: 'mdi-school', path: '', access: ['student','lecturer','mentor','dh','admin']},
        { title: 'Mentor', icon: 'mdi-account-supervisor', path: '', access: ['student','dh']},
        { title: 'Timetable', icon: 'mdi-timetable', path: '', access: ['student','lecturer','mentor']},
        { title: 'Mahapola', icon: 'mdi-cash', path: '', access: 'student'},
        { title: 'Students', icon: 'mdi-account', path: '', access: ['lecturer','mentor','dh','admin']},
        { title: 'Mahapola Duration', icon: 'mdi-calendar-edit', path: '', access: 'admin'},
        { title: 'Attendance Percentage', icon: 'mdi-brightness-percent', path: '', access: 'admin'},
      ]
    }
  }
}
</script>

<style>

</style>

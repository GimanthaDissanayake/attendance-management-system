<template>
  <nav>
    <v-app-bar>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <!-- add logo here -->
        Attendance Management System
      </v-toolbar-title>
       <v-spacer></v-spacer>
      <div>
        <v-btn
          class="mx-2"
          fab
          small
          color="primary"
        >
          <v-icon >mdi-android-messages</v-icon>
        </v-btn>
        <v-btn
          class="mx-2"
          fab
          small
          color="primary"
        >
          <v-icon >mdi-bell</v-icon>
        </v-btn>
        <v-avatar
          color="primary"
          size="49"
        >
          <span class="white--text headline">SC</span>
        </v-avatar>
      </div>
    </v-app-bar>
      <v-spacer></v-spacer>

      <v-navigation-drawer 
        v-model="drawer"
        absolute
        temporary
      >
        <v-list
          nav
          dense
        >
          <v-list-item
            v-for="item in items"
            v-bind:key="item.title"
            link
            v-show="item.access=='all' || item.access.includes('lecturer')"
          >
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

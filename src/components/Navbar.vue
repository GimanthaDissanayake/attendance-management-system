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
            v-bind:key="item.title">
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
  <!-- <nav>
    <v-toolbar flat app>
      <v-toolbar-side-icon @click="drawer = !drawer" class="grey--text"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">face</span>
        <span>que</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="text-center">
    <v-btn
      class="mx-2"
      fab
      small
      color="primary"
    >
      <v-icon >
        mdi-android-messages
      </v-icon>
    </v-btn>

    <v-btn
      class="mx-2"
      fab
      small
      color="primary"
    >
      <v-icon >
        mdi-bell
      </v-icon>
    </v-btn>
     <v-avatar
      color="primary"
      size="49"
    >
    <span class="white--text headline">HJ</span>
    </v-avatar>
    

    </div>
    
      
    </v-toolbar>

    <v-navigation-drawer app v-model="drawer" class="primary">
      <v-layout column align-center>
        <h1 class="lg-3">Logo</h1>
        <p  class="white--text">Attendance Management System</p>
      </v-layout>
      <v-list>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

  </nav> -->
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', path: '', access: ''},
        { title: 'Courses', icon: 'mdi-school', path: '', access: ''},
        { title: 'Mentor', icon: 'mdi-timetable', path: '', access: ''},
        { title: 'Timetable', icon: 'mdi-timetable', path: '', access: ''},
      ],
      // links: [
      //   { icon: 'mdi-school', text: 'Courses', route: '/Courses' },
      //   { icon: 'mdi-timetable', text: 'Timetable', route: '/Timetable' },
      //   { icon: 'mdi-medical-bag', text: 'Medical', route: '/Medical' },
      // ]
    }
  }
}
</script>

<style>

</style>

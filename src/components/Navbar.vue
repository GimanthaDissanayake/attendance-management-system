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
        <v-btn color="#DBB2FF" v-on:click="logout">
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
            router
            :to="item.path"
            v-show="item.access=='all' || item.access.includes(user.role)">
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
import { mapMutations } from 'vuex';
import { navBar } from "../data/data";
export default {
  computed: {
    user(){ 
      return this.$store.state.user;
    }
  },
  data() {
    return {
      drawer: true,
      items: navBar.headers,
    }
  },
  methods: {
    ...mapMutations(["removeToken"]),
    logout() {
      this.removeToken();
    }
  }
}
</script>

<style>

</style>

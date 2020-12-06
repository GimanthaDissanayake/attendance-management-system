<template>
  <nav fill-height>
    <v-app-bar flat app dark class="primary">
      <v-app-bar-nav-icon @click.stop="drawer=!drawer"></v-app-bar-nav-icon>      
      <v-toolbar-title>
        Attendance Management System
      </v-toolbar-title>
       <v-spacer></v-spacer>
        <v-btn v-show="user.role!='admin'" class="mx-2" color="#DBB2FF" fab small>
          <v-icon small color="black">mdi-android-messages</v-icon>
        </v-btn>
        <v-btn color="#DBB2FF" v-on:click="logout">
          <span class="black--text">Sign Out</span>
          <v-icon color="black" right>mdi-logout-variant</v-icon>
        </v-btn>
    </v-app-bar>
      <v-navigation-drawer app clipped fill-height v-model="drawer">
        <v-img src="../assets/logo.png"></v-img>
        <v-list nav dense>
          <v-list-item color="primary"
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
    }
  },
  methods: {
    ...mapMutations(["removeToken"]),
    logout() {
      this.removeToken();
    },
  },
  mounted(){
    //console.log(this.user);
  }
}
</script>

<style>

</style>

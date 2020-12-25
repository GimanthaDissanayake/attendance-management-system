<template>
  <nav fill-height>
    <v-app-bar flat app dark class="primary">
      <v-app-bar-nav-icon @click.stop="drawer=!drawer"></v-app-bar-nav-icon>      
      <!-- <v-toolbar-title>
        Attendance Management System
      </v-toolbar-title> -->
       <v-spacer></v-spacer>
       <span class="nameTxt d-none d-sm-flex">{{user.name }}</span><v-spacer></v-spacer><span class="roleTxt d-none d-sm-flex">logged in as {{ user.role}}</span>
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
      value.items[5].access = ['student', this.$store.state.mahapola];
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
    }
  },
  methods: {
    ...mapGetters(['getUser']),
    ...mapMutations(["removeToken"]),
   async setBadge(){
      this.users = this.getUser();
      const userId = this.user.username;
       const result = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/alert/badge/",{
       userId
       });
         this.badgeNum = result.data.alert.length;
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
    font-family: 'Concert One', cursive;
    font-size: 30px;
  }
  .roleTxt{
    font-family: 'Concert One', cursive;
    font-size: 18px;
  
  }
</style>

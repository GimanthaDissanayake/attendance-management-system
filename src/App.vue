<template>
  <v-app class="grey lighten-4">
    <v-container v-if="is_logged">
      <Navbar></Navbar>
      <v-main class="mx-4 mb-4">
        <router-view></router-view>
      </v-main>
    </v-container>
    
    <Login v-if="!is_logged"></Login>    
    <br><br>
    <v-footer
      absolute
      class="font-weight-medium" color="#E0E0E0">
      <v-col
        class="text-center"
        cols="12">
        <strong>@{{ new Date().getFullYear() }} All rights reserved | Design by Group 3</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import Login from './views/Login'

export default {
  components: { 
    Navbar,
    Login 
  },
  name: 'App',
  computed: {
    is_logged(){ 
      return this.$store.state.user.is_logged;
    }
  },
  methods: {
    
  }
}
</script>

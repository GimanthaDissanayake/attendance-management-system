<template>
  <v-app class="grey lighten-4">
    <Navbar></Navbar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer
      absolute
      class="font-weight-medium">
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

export default {
  components: { 
    Navbar 
  },
  name: 'App'
}
</script>

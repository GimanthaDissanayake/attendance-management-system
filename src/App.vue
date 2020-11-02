<template>
  <v-app class="grey lighten-4">
    <Navbar></Navbar>

    <v-main class="mx-4 mb-4">
      <router-view></router-view>
    </v-main>

    <v-footer
      absolute
      class="font-weight-medium"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Group 3</strong>
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

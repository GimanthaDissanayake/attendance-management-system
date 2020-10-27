<template>
  <v-app>
    <div>
      <v-app-bar dense>
        <v-toolbar-title>AMS</v-toolbar-title>
      </v-app-bar>
      <v-main>
       <!-- <HelloWorld/> -->
       <Student/>
      </v-main>
    </div>    
  </v-app>
</template>

<script>
//import HelloWorld'./components/HelloWorld';
import Student from './components/Student';

export default {
  name: 'App',

  components: {
    //HelloWorld,
    Student,
  },

  data: () => ({
    //
  }),
};
</script>

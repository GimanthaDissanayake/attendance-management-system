<template>
  <v-app>
    <div>
      <v-app-bar dense>
        <v-toolbar-title>AMS</v-toolbar-title>
      </v-app-bar>
      <v-main>
        <HelloWorld/>
      </v-main>
    </div>    
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>

<template>
  <v-stepper v-model="stepCount">
      <v-stepper-header>
        <v-stepper-step :complete="stepCount > 1" step="1"> 
            <!-- select student -->
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="stepCount > 2" step="2"> 
            <!-- upload student image -->
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="stepCount > 3" step="3"> 
            <!-- save -->
        </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
            
        </v-stepper-content>
        <v-stepper-content step="2">
            
        </v-stepper-content>
        <v-stepper-content step="3">
            
        </v-stepper-content>
      </v-stepper-items>
  </v-stepper>
</template>

<script>
export default {
    data() {
        return {
            stepCount: 1
        }
    }
}
</script>

<style>

</style>
<template>
  <v-container>
      <p class='text-h5'>View Mahapola Eligibility</p> 

      <v-container v-if="eligibility==true">
        <p class='text-h6'>You are eligibile to receive mahapola for the time period.</p> 
      </v-container>

      <v-container v-if="eligibility==false">
        <p class='text-h6 error--text'>You are not eligibile to receive mahapola for the time period because of your low attendance for below subjects</p>

        <v-data-table
        :headers="headers"
        :items="courses"
        :search="search"
        class="elevation-2"
        ></v-data-table> 
      </v-container>
  </v-container>
</template>

<script>
import { viewMahapolaEligibility } from "../data/data";
export default {
    data(){
        return{
            eligibility: false,
            headers: viewMahapolaEligibility.headers,
            courses: viewMahapolaEligibility.courses,
            
        }
    },
}
</script>

<style>

</style>
<template>
  <v-container>
    <v-row>
      <p class='text-h5'>View Mahapola Eligibility</p> 
    </v-row>
    <v-row>
      <v-col>
        <v-container>
        <v-container v-if="eligibility">
          <p class='text-h6'>You are eligibile to receive mahapola for the time period from {{start_date}} to {{end_date}}</p> 
        </v-container>
        <v-container v-if="!eligibility">
          <p class='text-h6 error--text'>You are not eligibile to receive mahapola for the time period from {{start_date}} to {{end_date}} because of your low attendance for below subjects</p>
          <v-data-table
          :headers="headers"
          :items="courses"
          class="elevation-2"
          >
            <template v-slot:item.percentage="{ item }">
              <v-chip
              :color="getColor(item.percentage)"
              dark>
                  {{ item.percentage }}
              </v-chip>
            </template>
          </v-data-table> 
        </v-container>
      </v-container> 
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import { mapGetters } from "vuex";
import { viewMahapolaEligibility } from "../data/data";
export default {
    data(){
      return{
        eligibility: true,
        start_date: null,
        end_date: null,
        headers: viewMahapolaEligibility.headers,
        courses: viewMahapolaEligibility.courses,            
      }
    },
    methods: {
      ...mapGetters(["getToken", "getUser"]),
      getColor(percentage){
        if(percentage > 80) return 'green'
        else if(percentage == 80) return 'orange'
        else return 'red'
      },
      async getMahapolaData(){
        const token = this.getToken();
        const user = this.getUser();    
        const registration_no = user.username;
          const result = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/mahapola/",{
            registration_no,
          });
        const returnedCourses = result.data.mahapola;
        this.start_date = returnedCourses[0].start_date.split('T')[0];
        this.end_date = returnedCourses[0].end_date.split('T')[0];
        const mappedCourses = [];
        returnedCourses.map(course => {
          if(course.percentage < 80) {
            this.eligibility = false;
            mappedCourses.push(course);
          }
        });
        this.courses = mappedCourses;
      }
    },
    async created(){
      try{
        this.getMahapolaData();
      } catch(err){
        console.log(err);
      }
    }
}
</script>

<style>

</style>
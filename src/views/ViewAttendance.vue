<template>
  <v-container>
    <p class='text-h5'>View Attendance</p>      
    
    <v-card class="elevation-4">
        <v-card-title>
        <v-text-field
                v-model="search"
                label="Search"
                placeholder="Enter Course Code or Course Title to search"
                append-icon="mdi-magnify"
                outlined
                clearable
                single-line
            ></v-text-field>
        </v-card-title>
        <v-data-table
        :headers="headers"
        :items="courses"
        :search="search"
        >
            <template v-slot:item.attendance_percentage="{ item }">
                <v-chip
                :color="getColor(item.attendance_percentage)"
                dark>
                    {{ item.attendance_percentage }}
                </v-chip>
            </template>
        </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { viewAttendance } from "../data/data";
export default {
    data () {
      return {
        search: '',
        headers:viewAttendance.headers,
        courses:viewAttendance.courses,
      }
    },
    methods: {
        getColor(attendance_percentage){
            if(attendance_percentage < 80) return 'red'
            else if(attendance_percentage > 80) return 'green'
            else return 'orange'
        }
    }
}
</script>

<style>
</style>
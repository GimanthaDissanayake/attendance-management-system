<template>
  <v-container>
      <p class='text-h5'>View Detailed Attendance</p> 

      <v-card class="mx-4 mb-4 text-body-2">
          <v-container>
            <v-row>
                <v-col cols="6" sm="4" md="4">
                    <v-row>
                        <v-col cols="7" sm="5" md="5">
                            Student Name :
                        </v-col>
                        <v-col>
                            <v-chip>{{student.name}}</v-chip>
                        </v-col>
                    </v-row>                    
                </v-col>
                <v-col cols="6" sm="4" md="4">
                    <v-row>
                        <v-col cols="7" sm="5" md="5">
                            Registration No :
                        </v-col>
                        <v-col>
                            <v-chip>{{student.registration_no}}</v-chip>
                        </v-col>
                    </v-row>                    
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" sm="4" md="4">
                    <v-row>
                        <v-col cols="7" sm="5" md="5">
                            Degree Program :
                        </v-col>
                        <v-col>
                            <v-chip>{{student.degree_program}}</v-chip>
                        </v-col>
                    </v-row>                    
                </v-col>
                <v-col cols="6" sm="4" md="4">
                    <v-row>
                        <v-col cols="7" sm="5" md="5">
                            Course Code :
                        </v-col>
                        <v-col>
                            <v-chip>{{student.course_code}}</v-chip>
                        </v-col>
                    </v-row>                    
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" sm="4" md="4">
                    <v-row>
                        <v-col cols="7" sm="5" md="5">
                            Course Title :
                        </v-col>
                        <v-col>
                            <v-chip>{{student.course_title}}</v-chip>
                        </v-col>
                    </v-row>                    
                </v-col>
                <v-col cols="6" sm="4" md="4">
                    <v-row>
                        <v-col cols="7" sm="5" md="5">
                            Attendance Percentage :
                        </v-col>
                        <v-col>
                            <v-chip>{{student.attendance_percentage}}</v-chip>
                        </v-col>
                    </v-row>                    
                </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="8">
                    <v-card>
                        <v-data-table
                        :headers="headers"
                        :items="dates"
                        :items-per-page="5" >
                            <template v-slot:item.status="{ item }">
                                <v-chip
                                :color="getColor(item.status)"
                                dark>
                                    {{ item.status }}
                                </v-chip>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-col>
            </v-row>
          </v-container>
      </v-card>
  </v-container>
</template>

<script>
import { viewDetailedAttendance } from "../data/data";
export default {
    data() {
        return{
            student:viewDetailedAttendance.student,
            headers:viewDetailedAttendance.headers,
            dates:viewDetailedAttendance.dates,
            
        }
    },
    methods: {
        getColor(status){
            if(status == 'present') return 'green'
            else return 'red'
        }
    }
}
</script>

<style scoped>
</style>
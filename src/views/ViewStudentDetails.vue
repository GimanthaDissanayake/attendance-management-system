<template>
  <v-container>
     <p class='text-h5'>View Student Details</p> 

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
                            Level :
                        </v-col>
                        <v-col>
                            <v-chip>{{student.level}}</v-chip>
                        </v-col>
                    </v-row>                    
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" sm="4" md="4">
                    <v-row>
                        <v-col cols="7" sm="5" md="5">
                            Mentor Name :
                        </v-col>
                        <v-col>
                            <v-chip>{{student.mentor}}</v-chip>
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
                        :items="courses"
                        :items-per-page="5" >
                           
                            
                            <template v-slot:item.attendance_percentage="{ item }">
                              <v-btn
                                block
                                depressed
                                large
                                text
                              >
                                <v-chip
                                  :color="getColor(item.attendance_percentage)"
                                  dark
                                >
                                  {{ item.attendance_percentage }}
                                </v-chip>
                              </v-btn>
                            </template>
                            <template v-slot:item.course_code="{ item }">
                              <v-btn
                                block
                                depressed
                                large
                                text
                              >
                                  {{ item.course_code }} 
                              </v-btn>
                            </template>
                             <template v-slot:item.course_name="{ item }">
                              <v-btn
                                
                                depressed
                                large
                                text
                              >
                                  {{ item.course_name }} 
                              </v-btn>
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
import { viewStudentDetails } from "../data/data";
export default {
    data() {
        return{
            student:viewStudentDetails.student,
            headers: viewStudentDetails.headers,
            courses: viewStudentDetails.courses
            
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

<style scoped>
</style>
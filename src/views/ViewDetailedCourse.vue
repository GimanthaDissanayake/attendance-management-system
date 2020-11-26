<template>
  <v-container>
      <p class='text-h5'>Detailed Attendance Information</p>  

      <v-card class="mx-4 mb-4 text-body-2">
          <v-container>
            <v-row>
                <v-col cols="6" sm="4" md="4">
                    <v-row>
                        <v-col cols="7" sm="4" md="4">
                            <p>Course Code :</p>
                        </v-col>
                        <v-col>
                            <v-chip>{{course.course_code}}</v-chip>
                        </v-col>
                    </v-row>                      
                </v-col>
                <v-col>
                    <v-btn>
                        View Registered Students
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" sm="4" md="4">
                    <v-row>
                        <v-col cols="7" sm="4" md="4">
                            <p>Course Title :</p>
                        </v-col>
                        <v-col>
                            <v-chip>{{course.course_title}}</v-chip>
                        </v-col>
                    </v-row>                      
                </v-col>
                <v-col>
                    <v-btn>
                        Mark Attendance
                    </v-btn>
                </v-col>
            </v-row>
              <v-row>
                <v-col  cols="6" sm="4" md="4">
                    <v-row>
                        <v-col cols="7" sm="4" md="4">
                            <p>Attendance Percentage :</p>
                        </v-col>
                        <v-col>
                            <v-chip>{{course.overall_attendance_percentage}}</v-chip>
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
                        </v-data-table>
                    </v-card>
                </v-col>
            </v-row>
          </v-container>
      </v-card>
  </v-container>
</template>

<script>
import { viewDetailedCourse } from "../data/data";
export default {
    data() {
        return {
            course:viewDetailedCourse.course,
            headers:viewDetailedCourse.headers,
            dates:viewDetailedCourse.dates,
            
        }
    },
}
</script>

<style>

</style>
<template>
  <v-container>
      <p class='text-h5'>Attendance Report for {{course.course_code}}</p> 

      <v-card class="mx-4 mb-4 text-body-2">
          <v-container>
            <v-row align="center" justify="center">
                <v-col cols="6" sm="4" md="4">
                    <v-row>
                        <v-col cols="6" sm="4" md="4">
                            Student Name :
                        </v-col>
                        <v-col>
                            <v-chip>{{student.student_name}}</v-chip>
                        </v-col>
                    </v-row>                    
                </v-col>
                <v-col cols="6" sm="4" md="4">
                    <v-row>
                        <v-col cols="6" sm="4" md="4">
                            Registration No :
                        </v-col>
                        <v-col>
                            <v-chip>{{student.registration_no}}</v-chip>
                        </v-col>
                    </v-row>                    
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="6" sm="4" md="4">
                    <v-row>
                        <v-col cols="6" sm="4" md="4">
                            Degree Program :
                        </v-col>
                        <v-col>
                            <v-chip>{{student.degree_name}}</v-chip>
                        </v-col>
                    </v-row>                    
                </v-col>
                <v-col cols="6" sm="4" md="4">
                    <v-row>
                        <v-col cols="6" sm="4" md="4">
                            Course Code :
                        </v-col>
                        <v-col>
                            <v-chip>{{course.course_code}}</v-chip>
                        </v-col>
                    </v-row>                    
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="6" sm="4" md="4">
                    <v-row>
                        <v-col cols="6" sm="4" md="4">
                            Course Title :
                        </v-col>
                        <v-col>
                            <v-chip>{{course.course_title}}</v-chip>
                        </v-col>
                    </v-row>                    
                </v-col>
                <v-col cols="6" sm="4" md="4">
                    <v-row>
                        <v-col cols="6" sm="4" md="4">
                            Attendance Percentage :
                        </v-col>
                        <v-col>
                            <v-chip>{{course.attendance_percentage}}</v-chip>
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
import axios from 'axios';
import { mapGetters } from "vuex";
import { viewDetailedAttendance } from "../data/data";
export default {
    data() {
        return{
            course: null,
            selectedStudent: null,
            student:viewDetailedAttendance.student,
            headers:viewDetailedAttendance.headers,
            dates:viewDetailedAttendance.dates,
            
        }
    },
    methods: {
        ...mapGetters(["getCourse"],["getUser"]),
        getColor(status){
            if(status == 'present') return 'green'
            else return 'red'
        },
        async getStudent(registration_no){
            console.log('abc'+registration_no);
            await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/registration_no/",{
            registration_no,
            })
            .then(result => {
                this.student = result.data.student[0][0];
                //this.selectedStudent = result.data.student[0];
                //console.log(s.student_name);
            //   console.log(result.data.student[0]);
              })
              .catch(err => {console.log(err)});
        },
        async setData(){
            this.course = this.getCourse();
            //console.log(this.$store.state.user.username);
            if(this.$store.state.user.role === "student")
                this.getStudent(this.$store.state.user.username);
        }
    }, 
    async mounted() {
        this.setData();
    }
}
</script>
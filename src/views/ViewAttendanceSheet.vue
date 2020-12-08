<template>
    <v-container>
        <p class='text-h5'>Attendance Sheet</p> 

        <v-card>
            <v-container>
                <v-row>
                     <v-col cols="14" sm="7" md="7">
                         <v-row>
                             <v-col>
                                 <p>Course Code :</p>
                             </v-col>
                             <v-col>
                                 <v-chip>{{course.course_code}}</v-chip>
                             </v-col>
                             <v-col>
                                 <p>Course Title :</p>
                             </v-col>
                             <v-col>
                                 <v-chip>{{course.course_title}}</v-chip>
                             </v-col>
                         </v-row>
                         <v-row>
                             <v-col>
                                 <p>Date :</p>
                             </v-col>
                             <v-col>
                                 <v-chip>{{selectedDate}}</v-chip>
                             </v-col>
                             <v-col>
                                 <p>Overall Attendance Percentage :</p>
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
                        :items="students"
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
import { viewAttendanceSheet } from "../data/data";
import axios from 'axios';
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            course:[],
            students: [],
            headers: viewAttendanceSheet.headers,
            selectedDate:'' ,
        
        }
    },
    methods: {
        ...mapGetters(["getCourse"],["getUser"],["getSelectedDate"]),
        
         async setData(){
           this.course = this.getCourse();
          this.selectedDate = this.$store.state.selectedDate;
            // const course_code = this.course.course_code;
             const co_id = this.course.co_id;
              const date = this.selectedDate;
        //     this.date = this.getDate();
             console.log(this.selectedDate);
             console.log(this.course.co_id);

             return await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/attendance_sheet/",{
             co_id,
             date
             })
             .then(async result => {
                this.students = result.data.attendance;
                console.log(result);
               // this.date_time = attendanceData.date_time;               
            })
            .catch(err => {
                console.log(err);
            });
        
        },
        
    },
    
    async created() {
        await this.setData();
    }
}
</script>


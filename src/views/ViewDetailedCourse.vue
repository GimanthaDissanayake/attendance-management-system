<template>
  <v-container>
      <p class='text-h5'>{{ course.course_title }}</p>  

      <v-card class="mx-4 mb-4 text-body-2">
          
           <v-container>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="8">
                        <v-container>
                            <v-row>
                                <v-col>
                                    <v-row>
                                        <v-col cols="12" sm="4" md="12">
                                            <v-row>
                                                <v-col cols="7" sm="4" md="4">
                                                    <p>Course Code:</p>
                                                </v-col>
                                                <v-col>
                                                    <v-chip>{{course.course_code}}</v-chip>
                                                </v-col>
                                            </v-row>                      
                                        </v-col>
                
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" sm="4" md="12">
                                            <v-row>
                                                <v-col cols="7" sm="4" md="4">
                                                    <p>Total Registered students :</p>
                                                </v-col>
                                                <v-col>
                                                    <v-chip> {{ListReg}} </v-chip>
                                                </v-col>
                                            </v-row>                      
                                        </v-col>
                                    </v-row>
                                    
                                </v-col>

                                <v-col>
                                    <v-row>
                                        <v-col  cols="12" sm="4" md="12">
                                            <v-row>
                                                <v-col cols="7" sm="4" md="4">
                                                    <p>Attendance Percentage :</p>
                                                </v-col>
                                                <v-col>
                                                    <v-chip>3</v-chip>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" sm="4" md="12">
                                            <v-row>
                                                <v-col cols="7" sm="4" md="4">
                                                    <p>Year :</p>
                                                </v-col>
                                                <v-col>
                                                    <v-chip>2020</v-chip>
                                                </v-col>
                                            </v-row>                      
                                        </v-col>
                
                                    </v-row>
                                    
                                    <v-row>
                                        <v-col cols="12" sm="4" md="12">
                                            <v-btn class="primary">
                                                view Registered Students
                                            </v-btn>                   
                                        </v-col>
                                    </v-row>
                                    
                                </v-col>
                                
                            </v-row>
            
                        </v-container>

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
                        v-on:click:row="selectDate"
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
import axios from 'axios';
import { mapGetters , mapMutations } from "vuex";
import { viewDetailedCourse } from "../data/data";
export default {
    data() {
        return {
            course:[],
            headers:viewDetailedCourse.headers,
            dates: [],
            ListReg: [],
            cour:[],
            course2:[],
            date_time: [],
            
        }
    },
     methods: {
        ...mapGetters(["getCourse"],["getUser"]),
        
        async setReg(){
            this.course = this.getCourse();
            const course_code = this.course.course_code;
            const co_id = this.course.co_id;
            //console.log(co_id);
            //const course_code = this.course.course_code;
            return await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/course_code/",{
             course_code,
             })
             .then(result => {
                 const list = result.data.students;
                //this.ListReg = "heshan";
                this.ListReg = list.length;
             })
             .catch(err => {
                 console.log(err);
             })

        },
        async setDate(){
             this.course2 = this.getCourse();
            const co_id = this.course.co_id;
           
            return await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/course/attendance/",{
             co_id,
             })
             .then(async result => {
                const attendanceData = result.data.attendance;
                this.date_time = attendanceData.date_time;
                const newDates = attendanceData.map((attendanceDetail) => {
                    attendanceDetail.date = attendanceDetail.date_time.split('T')[0];
            
                    return attendanceDetail;
                })
                return await newDates;                
            })
            .then(nd => {
                this.dates = nd; 
            })
            .catch(err => {
                console.log(err);
            });

        },
        selectDate(dates){
        this.setDate({
            dates:dates.date,
        });
        //console.log(dates.date);

    
          this.$router.push("/ViewAttendanceSheet");
        
      }
    },
    
    async created() {
        await this.setReg();
        await this.setDate();
    }
}
</script>

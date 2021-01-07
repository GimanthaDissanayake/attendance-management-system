<template>
    <v-container>
        <v-row>
            <p class='text-h5'>{{ course.course_title }}</p>  
        </v-row>
        <v-row>
            <v-col>
                <v-card>   
                    <br> 
                    <v-row>
                        <v-spacer></v-spacer>
                        <v-col>
                            <p>Course Code:</p>
                        </v-col>
                        <v-col>
                            <v-chip>{{course.course_code}}</v-chip>
                        </v-col>
                        <v-col>
                            <p>Attendance Percentage :</p>
                        </v-col>
                        <v-col>
                            <v-chip>{{course.percentage}}%</v-chip>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-spacer></v-spacer>
                        <v-col>
                            <p>Total Registered students :</p>
                        </v-col>
                        <v-col>
                            <v-chip> {{ListReg}} </v-chip>
                        </v-col>
                        <v-col>
                            <p>Year :</p>
                        </v-col>
                        <v-col>
                            <v-chip>{{course.year}}</v-chip>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-col md="3">
                            <v-btn 
                                class="primary"
                                @click="regbtn">
                                    view Registered Students
                            </v-btn>   
                        </v-col>
                        <v-spacer></v-spacer>
                    </v-row>                        
                    <v-row align="center" justify="center">
                        <v-col cols="12" sm="8" md="8">
                            <v-card>
                                <v-data-table
                                    :headers="headers"
                                    :items="dates"
                                    v-on:click:row="selectDate"
                                    :items-per-page="5">
                                </v-data-table>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>      
    </v-container>
</template>

<script>
import axios from 'axios';
import { mapGetters , mapMutations } from "vuex";
import { viewDetailedCourse } from "../data/data";
import moment from 'moment';
export default {
    data() {
        return {
            course:[],
            headers:viewDetailedCourse.headers,
            dates: [],
            ListReg: [],
            course2:[],
            date_time: [],            
        }
    },
     methods: {
        ...mapGetters(["getCourse"],["getUser"]),
        ...mapMutations(["setSelectedDate"]),
        async setReg(){
            this.course = this.getCourse();
            // console.log(this.course);
            //this.course.percentage = this.course.percentage.toFixed(2);
            // this.course = this.course.map(c => {
            //     c.percentage = (c.attendance_percentage).toFixed(2);
            //     return c;
            // })
            const course_code = this.course.course_code;
            const co_id = this.course.co_id;
            // console.log(this.course);
            return await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/course_code/",{
             course_code,
             })
             .then(result => {
                // const list = result.data.students;
                // console.log(result.data.students.length);
                this.ListReg = result.data.students.length;
             })
             .catch(err => {
                 console.log(err);
             })

        },
        pad(str){ str = str.toString(); return "00".substring(0, 2-str.length) + str; },

        async setDate(){
            this.course2 = this.getCourse();
            const co_id = this.course.co_id;
           
            return await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/course/attendance/",{
             co_id,
             })
             .then(async result => {
                const attendanceData = result.data.attendance;
                //console.log(attendanceData);
                this.date_time = attendanceData.date_time;
                const newDates = attendanceData.map((attendanceDetail) => {
                    // let date = new Date(attendanceDetail.date_time);
                    let date = moment(attendanceDetail.date_time).format('YYYY-MM-DD');
                    //console.log(date2);
                    //let utcdatestring = date.getUTCFullYear() + "-" + this.pad(date.getUTCMonth() + 1) + "-" + this.pad(date.getUTCDate()+1);
                    attendanceDetail.date = date;            
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
            this.setSelectedDate(dates.date);
        //console.log(dates.date);

    
          this.$router.push("/ViewAttendanceSheet");
        
      },
      regbtn(){
          this.$router.push("/ViewRegisteredStudents");
      }
    },
    
    async created() {
        await this.setReg();
        await this.setDate();
    }
}
</script>

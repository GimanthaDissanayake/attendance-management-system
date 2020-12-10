<template>
    <v-container>
        <p class='text-h5'>Attendance Sheet - {{selectedDate}}</p> 

        <v-card class="mx-4 mb-4 text-body-2">
            <v-container align="center" justify="center">
                <v-row cols="14" sm="7" md="7">
                     <v-col>
                         <v-row align="center" justify="center">
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
                         <v-row align="center" justify="center">
                             <v-col>
                                 <p>Date :</p>
                             </v-col>
                             <v-col>
                                 <v-chip>{{selectedDate}}</v-chip>
                             </v-col>
                             <v-col>
                                 <p>Attendance Percentage :</p>
                             </v-col>
                             <v-col>
                                 <v-chip>{{percentage+'%'}}</v-chip>
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
                        v-model="search"
                        loading="isLoading"
                        :search="search"
                        :headers="headers"
                        :items="students"
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
            count:0,
            total:'',
            percentage:'',
        
        }
    },
    methods: {
        ...mapGetters(["getCourse"],["getUser"],["getSelectedDate"]),
        getColor(status){
            if(status == 'present') return 'green'
            else return 'red'
        },
        
         async setData(){
           this.course = this.getCourse();
          this.selectedDate = this.$store.state.selectedDate;
         
            const co_id = this.course.co_id;
            const date = this.selectedDate;
    
             return await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/attendance_sheet/",{
             co_id,
             date
             })
             .then(async result => {
                const newResult = result.data.attendance;
                this.total = newResult.length;
            
                const changedStatus = newResult.map((attendanceDetail) => {
                    if(attendanceDetail.status === 1){
                        attendanceDetail.status = 'present'
                        this.count++;
                    }
                    else
                        attendanceDetail.status = 'absent';

                    return attendanceDetail;
                })
                return await changedStatus;              
            })
            .then(ns => {
                this.students = ns;
                //count attendance percentage
                this.percentage = (this.count/this.total)*100;
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


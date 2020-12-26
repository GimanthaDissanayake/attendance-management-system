<template>
  <v-container>
      <v-row>
      <p class='text-h5'>Attendance Report for {{course.course_code}}</p> 
      </v-row>
      <v-row>
        <v-col>
            <v-card class="text-body-2">
                <v-container class="px-md-6">
                    <v-row align="center" justify="center">
                        <v-col>
                            <v-row>
                                <v-col>
                                    Student Name :
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col>
                                    <v-chip>{{student.student_name}}</v-chip>
                                </v-col>
                            </v-row>                    
                        </v-col>
                        <v-col>
                            <v-row>
                                <v-col>
                                    Registration No :
                                </v-col>
                                <v-col>
                                    <v-chip>{{student.registration_no}}</v-chip>
                                </v-col>
                            </v-row>                    
                        </v-col>
                    </v-row>
                    <v-row align="center" justify="center">
                        <v-col>
                            <v-row>
                                <v-col>
                                    Degree Program :
                                </v-col>
                                <v-col>
                                    <v-chip>{{student.degree_name}}</v-chip>
                                </v-col>
                            </v-row>                    
                        </v-col>
                        <v-col>
                            <v-row>
                                <v-col>
                                    Course Code :
                                </v-col>
                                <v-col>
                                    <v-chip>{{course.course_code}}</v-chip>
                                </v-col>
                            </v-row>                    
                        </v-col>
                    </v-row>
                    <v-row align="center" justify="center">
                        <v-col>
                            <v-row>
                                <v-col>
                                    Course Title :
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col>
                                    <v-chip>{{course.course_title}}</v-chip>
                                </v-col>
                            </v-row>                    
                        </v-col>
                        <v-col>
                            <v-row>
                                <v-col>
                                    Attendance Percentage :
                                </v-col>
                                <v-col>
                                    <v-chip>{{course.percentage}}%</v-chip>
                                </v-col>
                            </v-row>                    
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-col v-show="showAlert">
                            <v-btn
                                class="primary"
                                dark
                                @click="sendAlert">
                                <v-icon left>mdi-message-alert</v-icon>   
                                <span class="white--text"> Send Alert</span>                                
                            </v-btn>
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
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import { mapGetters } from "vuex";
import { viewDetailedAttendance } from "../data/data";
export default {
    data() {
        return{
            showAlert: false,
            course: [],
            student:[],
            headers:viewDetailedAttendance.headers,
            dates:[],            
        }
    },
    methods: {
        ...mapGetters(["getCourse","getUser","getStudent"]),
        getColor(status){
            if(status == 'present') return 'green'
            else return 'red'
        },
        async getAStudent(registration_no){
            return await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/registration_no/",{
            registration_no,
            })
            .then(result => {
                this.student = result.data.student[0][0];
            })
            .catch(err => {
                console.log(err);
            });
        },
        async setData(){
            this.course = this.getCourse();
            const co_id = this.course.co_id;
            let student_id = null;

            if(this.$store.state.selectedStudent){
                this.showAlert = true;
                const student = this.getStudent();
                student_id = student.registration_no;
                await this.getAStudent(student_id);
                this.$store.state.selectedStudent = false;
            }
            else {
                student_id = this.$store.state.user.username;
                //console.log(co_id);
                if(this.$store.state.user.role === "student")
                    await this.getAStudent(student_id);                
            }
            await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/attendance/", {
                student_id,
                co_id
            })
            .then(async result => {
                const attendanceData = result.data.attendance;
                const newDates = attendanceData.map((attendanceDetail) => {
                    attendanceDetail.date = attendanceDetail.date_time.split('T')[0];
                    if(attendanceDetail.status === 1)
                        attendanceDetail.status = 'present'
                    else
                        attendanceDetail.status = 'absent';
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
        sendAlert(student){
            // this.setStudent({
            //     registration_no: student.registration_no,
            //     name: student.student_name,
            //     //level: student.level,
            //     mentor_name: student.lecturer_name,
            //     mentor_id: student.mentor_id
            // });
            //console.log(student.lecturer_name);
            this.$router.push("/sendAlert");
        }
    }, 
    async created() {
        await this.setData();
    }
}
</script>
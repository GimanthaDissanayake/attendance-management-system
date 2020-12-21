<template>
  <v-container>
      <v-row>
          <v-col>
              <v-card shaped elevation=5>
                  <v-card-title class="pl-md-10 display-1">
                      <span class="pl-md-3 font-weight-light">{{name}}, logged in as {{role}}</span>
                  </v-card-title>
                  <v-card-text>
                      <v-row>
                          <v-spacer></v-spacer>
                          <v-spacer></v-spacer>
                          <v-col align=right class="headline">
                                {{currentDate}} 
                                <!-- <br>
                                {{currentTime}} -->
                          </v-col>
                      </v-row>                      
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-container>
          <v-row justify="center">
            <v-col cols=2 v-show="isStudent">
                <v-container>
                    <v-sheet
                    elevation="5"
                    rounded
                    width=100
                    height=100
                    class="pt-2 pl-2 pr-2">
                        <v-icon large color="primary">mdi-school-outline</v-icon>    
                        <v-row no-gutters align=start>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-col class="primary--text" style="font-size:40px" align=right
                                    v-bind="attrs"
                                    v-on="on">
                                        <animated-number
                                            :value="RegisteredCoursesCount"
                                            :formatValue="formatToPrice"
                                            :duration="2000"
                                        />
                                    </v-col>
                                </template>
                                <span>Total Registered Courses Count</span>
                            </v-tooltip> 
                        </v-row> 
                        <v-spacer></v-spacer>
                    </v-sheet>
                </v-container>                
            </v-col>
            <v-col cols=2 v-show="isStudent">
                <v-container>
                    <v-sheet
                    elevation="5"
                    rounded
                    width=100
                    height=100
                    class="pt-2 pl-2 pr-2">
                        <v-icon large color="primary">mdi-calendar-clock</v-icon>
                        <v-row no-gutters align=start>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-col class="primary--text" style="font-size:40px" align=right
                                    v-bind="attrs"
                                    v-on="on">
                                        <animated-number
                                            :value="TotalLecturesHeldCount"
                                            :formatValue="formatToPrice"
                                            :duration="2000"
                                        />
                                    </v-col>
                                </template>
                                <span>Total Lectures Count</span>
                            </v-tooltip> 
                        </v-row>
                    </v-sheet>
                </v-container>
            </v-col>
            <v-col cols=2 v-show="isStudent">
                <v-container>
                    <v-sheet
                    elevation="5"
                    rounded
                    width=100
                    height=100
                    class="pt-2 pl-2 pr-2">
                        <v-icon large color="green">mdi-calendar-check</v-icon>
                        <v-row no-gutters align=start>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-col class="green--text" style="font-size:40px" align=right
                                    v-bind="attrs"
                                    v-on="on">
                                        <animated-number
                                            :value="ToalLecturesPresentCount"
                                            :formatValue="formatToPrice"
                                            :duration="2000"
                                        />
                                    </v-col>
                                </template>
                                <span>Total Present Lectures Count</span>
                            </v-tooltip> 
                        </v-row>
                </v-sheet>
                </v-container>
            </v-col>
            <v-col cols=2 v-show="isStudent">
                <v-container>
                    <v-sheet
                    elevation="5"
                    rounded
                    width=100
                    height=100
                    class="pt-2 pl-2 pr-2">
                        <v-icon large color="error">mdi-calendar-remove</v-icon>
                        <v-row no-gutters align=start>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-col class="error--text" style="font-size:40px" align=right
                                    v-bind="attrs"
                                    v-on="on">
                                        <animated-number
                                            :value="TotalLectureAbsentCount"
                                            :formatValue="formatToPrice"
                                            :duration="2000"
                                        />
                                    </v-col>
                                </template>
                                <span>Total Absent Lectures Count</span>
                            </v-tooltip>                            
                        </v-row>
                    </v-sheet>
                </v-container>
            </v-col>
            <v-col cols=2 v-show="isLecturer">
                <v-container>
                    <v-sheet
                    elevation="5"
                    rounded
                    width=100
                    height=100
                    class="pt-2 pl-2 pr-2">
                        <v-icon large color="primary">mdi-school-outline</v-icon>
                        <v-row no-gutters align=start>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-col class="primary--text" style="font-size:40px" align=right
                                    v-bind="attrs"
                                    v-on="on">
                                        <animated-number
                                            :value="TotalCoursesTeaching"
                                            :formatValue="formatToPrice"
                                            :duration="2000"
                                        />
                                    </v-col>
                                </template>
                                <span>Total Courses Conducting</span>
                            </v-tooltip>                            
                        </v-row>
                    </v-sheet>
                </v-container>
            </v-col>
            <v-col cols=2 v-show="isLecturer">
                <v-container>
                    <v-sheet
                    elevation="5"
                    rounded
                    width=100
                    height=100
                    class="pt-2 pl-2 pr-2">
                        <v-icon large color="green">mdi-calendar-check</v-icon>
                        <v-row no-gutters align=start>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-col class="green--text" style="font-size:40px" align=right
                                    v-bind="attrs"
                                    v-on="on">
                                        <animated-number
                                            :value="TotalConducted"
                                            :formatValue="formatToPrice"
                                            :duration="2000"
                                        />
                                    </v-col>
                                </template>
                                <span>Total Conducted Lectures</span>
                            </v-tooltip>                            
                        </v-row>
                    </v-sheet>
                </v-container>
            </v-col>
            <v-col cols=2 v-show="isMentor">
                <v-container>
                    <v-sheet
                    elevation="5"
                    rounded
                    width=100
                    height=100
                    class="pt-2 pl-2 pr-2">
                        <v-icon large color="primary">mdi-account-group</v-icon>
                        <v-row no-gutters align=start>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-col class="primary--text" style="font-size:40px" align=right
                                    v-bind="attrs"
                                    v-on="on">
                                        <animated-number
                                            :value="TotalMentoringStudents"
                                            :formatValue="formatToPrice"
                                            :duration="2000"
                                        />
                                    </v-col>
                                </template>
                                <span>Total Mentoring Students</span>
                            </v-tooltip>                            
                        </v-row>
                    </v-sheet>
                </v-container>
            </v-col>
            <v-col cols=2 v-show="isHOD">
                <v-container>
                    <v-sheet
                    elevation="5"
                    rounded
                    width=100
                    height=100
                    class="pt-2 pl-2 pr-2">
                        <v-icon large color="secondary">mdi-bookshelf</v-icon>
                        <v-row no-gutters align=start>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-col class="secondary--text" style="font-size:40px" align=right
                                    v-bind="attrs"
                                    v-on="on">
                                        <animated-number
                                            :value="TotalDepartmentCoursesCount"
                                            :formatValue="formatToPrice"
                                            :duration="2000"
                                        />
                                    </v-col>
                                </template>
                                <span>Total Courses Offered By The Department</span>
                            </v-tooltip>                            
                        </v-row>
                    </v-sheet>
                </v-container>
            </v-col>
            <v-col cols=2 v-show="isHOD">
                <v-container>
                    <v-sheet
                    elevation="5"
                    rounded
                    width=100
                    height=100
                    class="pt-2 pl-2 pr-2">
                        <v-icon large color="error">mdi-calendar-multiselect</v-icon>
                        <v-row no-gutters align=start>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-col class="error--text" style="font-size:40px" align=right
                                    v-bind="attrs"
                                    v-on="on">
                                        <animated-number
                                            :value="TotalDepartmentDaysCount"
                                            :formatValue="formatToPrice"
                                            :duration="2000"
                                        />
                                    </v-col>
                                </template>
                                <span>Total Work Days Of The Department</span>
                            </v-tooltip>                            
                        </v-row>
                    </v-sheet>
                </v-container>
            </v-col>
        </v-row>
      </v-container>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import axios from 'axios';
import AnimatedNumber from "animated-number-vue";
export default {
    components: {
        AnimatedNumber
    },
    data() {
        return {
            name: '',
            role: '',
            currentDate : '',
            // currentTime: '',
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            year: '',
            month:'',
            day: '',
            date:'',
            // hh:'',
            // mm:'',
            isStudent: false,
            RegisteredCoursesCount: 0,
            TotalLecturesHeldCount: 0,
            ToalLecturesPresentCount: 0,
            TotalLectureAbsentCount: 0,
            isLecturer: false,
            TotalCoursesTeaching: 0,
            TotalConducted: 0,
            isMentor: false,
            TotalMentoringStudents: 0,
            TotalDepartmentCoursesCount: 0,
            TotalDepartmentDaysCount: 0,
            isHOD: false,
        }
    },
    methods: {
        ...mapGetters(["getToken", "getUser", "getStudent"]),
        setData() {
            const user = this.getUser();
            const token = this.getToken();
            this.name = user.name;
            this.role = user.role;
            if(user.role==='student')
                this.setStudentCounts();
            else if(user.role==='lecturer')
                this.setLecturerCounts();
            else if(user.role==='mentor'){
                this.setLecturerCounts();
                this.setMentorCounts();
            }
            else if(user.role==='hod'){
                this.setLecturerCounts();
                this.setMentorCounts();
                this.setDepartmentHeadCounts();
            }
        },
        async setStudentCounts() {
            this.isStudent=true;
            const user = this.getUser();
            const username = user.username;

            //total registered courses
            const r1 = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/registered_student/",{
                username
            });
            this.RegisteredCoursesCount = r1.data.count[0][0].count;
            
            //total lecture days
            const r2 = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/lecturer_days/",{
                username
            });
            this.TotalLecturesHeldCount = r2.data.count[0][0].count;

            //total present days
            const r3 = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/present_days/",{
                username
            });
            this.ToalLecturesPresentCount = r3.data.count[0][0].count;

            //total absent days
            const r4 = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/absent_days/",{
                username
            });
            this.TotalLectureAbsentCount = r4.data.count[0][0].count;
        },
        async setLecturerCounts() {
            this.isLecturer=true;
            const user = this.getUser();
            const username = user.username;

            //total absent days
            const r1 = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/total_courses/",{
                username
            });
            this.TotalCoursesTeaching = r1.data.count[0][0].count;

            const r2 = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/total_conducted/",{
                username
            });
            this.TotalConducted = r2.data.count[0][0].count;
        },
        async setMentorCounts() {
            this.isMentor=true;
            this.isLecturer=true;
            const user = this.getUser();
            const username = user.username;
            //total absent days
            const r1 = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/total_mentoring/",{
                username
            });
            this.TotalMentoringStudents = r1.data.count[0][0].count;
        },
        async setDepartmentHeadCounts() {
            this.isHOD=true;
            this.isLecturer=true;
            const user = this.getUser();
            const username = user.username;
            
            const r1 = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/total_dep_courses/",{
                username
            });
            this.TotalDepartmentCoursesCount = r1.data.count[0][0].count;

            const r2 = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/total_dep_days/",{
                username
            });
            this.TotalDepartmentDaysCount = r2.data.count[0][0].count;
        
        },
        formatToPrice(value) {
            return ` ${value.toFixed(0)}`;
        },
        setHODCounts() {
            this.isHOD=true;
        },
        DisplayLiveDateTime(timeStamp) {
            timeStamp = new Date(timeStamp);
            this.year = timeStamp.getFullYear();
            //let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
            this.month = this.months[timeStamp.getMonth()];
            this.date =timeStamp.getDate() < 10? "0" + timeStamp.getDate(): timeStamp.getDate();
            this.day = this.days[timeStamp.getDay()];
            // this.hh =timeStamp.getHours() < 10? "0" + timeStamp.getHours(): timeStamp.getHours();
            // this.mm =timeStamp.getMinutes() < 10? "0" + timeStamp.getMinutes(): timeStamp.getMinutes();
            //let ss =timeStamp.getSeconds() < 10? "0" + timeStamp.getSeconds(): timeStamp.getSeconds();
            
            this.currentDate = this.day + ', ' + this.date + ' ' + this.month + ' ' + this.year;
            // this.currentTime = this.hh + ':' + this.mm;
        },
        // LiveTimer(){
        //     this.DisplayLiveDateTime(new Date());
        //     // setInterval(this.LiveTimer,60000);
        // }
    },
    mounted() {
        this.setData();
        this.DisplayLiveDateTime(new Date());
    }
}
</script>

<style>

</style>
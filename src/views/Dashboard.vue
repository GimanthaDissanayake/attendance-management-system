<template>
  <v-container>
      <v-row>
          <v-col>
              <v-card shaped elevation=5>
                  <v-card-title class="pl-md-10 display-1">
                      Welcome Back, <span class="pl-md-3 font-weight-light">{{name}}</span>
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
                                    <!-- <number
                                        ref="number1"
                                        :from="0"
                                        :to="1000"
                                        :format="theFormat"
                                        :duration="5"
                                        :delay="2"
                                        easing="Power1.easeOut"/> -->

                                        {{RegisteredCoursesCount}}
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
                                        {{TotalLecturesHeldCount}}
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
                                        {{ToalLecturesPresentCount}}
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
                                        {{TotalLectureAbsentCount}}
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
                                        {{TotalCoursesTeaching}}
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
                                        {{TotalConducted}}
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
                                        {{TotalMentoringStudents}}
                                    </v-col>
                                </template>
                                <span>Total Mentoring Students</span>
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
import VueNumber from 'vue-number-animation'
export default {
    data() {
        return {
            name: '',
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
        }
    },
    methods: {
        ...mapGetters(["getToken", "getUser", "getStudent"]),
        setData() {
            const user = this.getUser();
            const token = this.getToken();
            this.name = user.name;
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
            console.log(r4.data)
            this.TotalLectureAbsentCount = r4.data.count[0][0].count;

        },
        setLecturerCounts() {
            this.isLecturer=true;
        },
        setMentorCounts() {
            this.isMentor=true;
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
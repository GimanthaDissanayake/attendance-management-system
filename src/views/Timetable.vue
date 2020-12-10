<template>
  <v-container>
    <v-row>
        <p class='text-h5'>My Timetable</p>  
    </v-row>    
    <v-row>
        <v-col>
            <v-card :loading="isLoading"> 
                <v-sheet height="600">
                    <v-calendar class="text-center"  
                        ref="calendar"
                        :weekdays="weekday"
                        :type="type"
                        :events="events"
                        :event-overlap-mode="mode"
                        :event-overlap-threshold="30"
                        :event-color="getColor">
                    </v-calendar>
                </v-sheet>
            </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations } from "vuex";
export default {
    data() {
        return {
            isLoading: true,
            weekday: [1, 2, 3, 4, 5],
            type: 'week',
            mode: 'column',
            value: '',
            events: [],
            courses: []
        }
    },
    methods: {
        ...mapGetters(["getToken", "getUser"]),
        getColor(event) {   
            const user = this.getUser();  
            const role = user.role;
            if(role!='student')
                return 'green';
            let color = 'green';  
            let course = this.courses.find((o,i) => {
                if(o.co_id === event.co_id)
                    return true;
            }); 
            if(course && course.attendance_percentage < 80)
                color='red';
            return color;
        },
        async getCourses(){
            const token = this.getToken();
            const user = this.getUser();  
            const role = user.role;
            const id = user.username;
            const result = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/course/timetable/",{
            id,
            role
            });
            this.events = result.data.courses;  
            
            if(user.role === "student"){
            const registration_no = user.username;
            const result = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/courses/",{
                registration_no,
            });
            this.courses = result.data.courses;
            //console.log(this.courses)
            // else{
            //     const lecturer_id = user.username;
            //     const result = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/lecturer_id/",{
            //     lecturer_id,
            // });
            // this.courses = result.data.courses;
            // console.log(this.courses)
            }
        }
    },
    mounted() {
        this.$refs.calendar.scrollToTime('08:00');   
        this.getCourses();  
        this.isLoading = false; 
    }
}
</script>

<style scoped>
</style>
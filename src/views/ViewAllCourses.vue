<template>
  <v-container>
    <v-row>
      <p class='text-h5'>My Courses</p>  
    </v-row>    
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <v-row cols=12>
              <v-col cols=3 v-show="showYear">
                <v-select
                  :items="years"
                  label="Select Year"
                  outlined
                  clearable
                  v-on:change="filterYears"
                  v-on:click:clear="resetYear">
                </v-select>
              </v-col>
              <v-col cols=3>
                <v-select
                  :items="levels"
                  label="Select Level"
                  outlined
                  clearable
                  v-on:change="filterLevels"
                  v-on:click:clear="resetCourses">
                </v-select>
              </v-col>
              <v-col cols=3>
                <v-select
                  :items="semesters"
                  label="Select Semester"
                  outlined
                  clearable
                  :disabled = "this.selectedLevel==''"
                  v-on:change="filterSemesters"
                  v-on:click:clear="resetDisplayed">
                </v-select>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="search"
                  label="Search"
                  placeholder="Search"
                  append-icon="mdi-magnify"
                  outlined
                  clearable
                  single-line>
                </v-text-field>
              </v-col>
            </v-row>       
          </v-card-title>
          <v-card-text>
            <v-data-table
              loading="isLoading"
              :headers="headers"
              :items="filteredCourses"
              :items-per-page="10"
              :search="search"
              v-on:click:row="selectCourse"
              class="elevation-1">
            </v-data-table>
          </v-card-text>          
        </v-card>  
      </v-col>      
    </v-row>      
  </v-container>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations } from "vuex";
import { viewCourses } from "../data/data";
  export default {
    data () {
      return {
        showYear: false,
        isLoading: true,
        search: '',
        filteredCourses: [],
        courses: [],
        selectedYear: '',
        selectedLevel: '',
        headers:viewCourses.headers,
        levels:viewCourses.levels,
        semesters:viewCourses.semesters,
        years: [],        
      }
    },
    methods: {
        ...mapMutations(["setCourse"]),   
        ...mapGetters(["getToken", "getUser"]),
        async getCourses() {
            const token = this.getToken();
            const user = this.getUser();  
            const hod_id = user.username;
            const result = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/admin/department/",{
            hod_id,
            });
            
            const department_id = result.data.departmentId[0].department_id;
            const result2 = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/course/department/",{
                department_id,
            });
            
            this.courses = result2.data.courses;
            this.courses = this.courses.map(c => {
                c.attendance_percentage = (c.attendance_percentage).toFixed(2);
                return c;
            })
            let y = await this.courses.map(c => {
                return c.year;
            })
            this.years = [...new Set(y)];
            this.showYear = true;     
        },
        filterYears(selected){
            if(selected!=null){
            this.selectedYear = selected
            this.filteredCourses = this.courses.filter(course => course.year === selected)
            }
        },
        filterLevels(selected) {
            if(selected!=null) {
            this.selectedLevel = selected;
            if(this.selectedYear!='')
                this.filteredCourses = this.courses.filter(course => course.level === selected && course.year === this.selectedYear)
            else
                this.filteredCourses = this.courses.filter(course => course.level === selected)
            }        
        },
        filterSemesters(selected) {
            if(selected!=null)
            this.filteredCourses = this.courses.filter(course => course.semester === selected && course.level === this.selectedLevel && course.year === this.selectedYear)
        },
        resetYear() {
            this.resetDisplayed();
            this.resetCourses();
            this.selectedYear = '';
            this.filteredCourses = this.courses;
        },
        resetCourses(){
            this.selectedLevel = '';
            if(this.selectedYear!='')
            this.filteredCourses = this.courses.filter(course => course.year === this.selectedYear)
            else
            this.filteredCourses = this.courses;
        },
        resetDisplayed(){
            this.filteredCourses = this.courses.filter(course => course.level === this.selectedLevel);
        },
        selectCourse(course){
            this.setCourse({
            co_id: course.co_id,
            type: course.type,
            course_code: course.course_code,
            course_title: course.course_title,
            level: course.level,
            semester: course.semester,
            percentage: course.attendance_percentage,
            year: course.year
            });
            if(this.$store.state.selectedStudent){
            this.$router.push("/viewDetailedAttendance");
            }
            else{
            if(this.getUser().role === "student")
                this.$router.push("/viewDetailedAttendance");
            else  
                this.$router.push("/viewDetailedCourse");
            }        
        }
    },
    async mounted(){
        try {
            console.log('hello');
            this.getCourses().then(() => {
            this.resetYear();
            this.isLoading = false;
            });
        } catch(err) {
            console.log(err.toString());
        }
    }
}
</script>

<style>

</style>
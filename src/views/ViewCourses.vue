<template>
  <v-container>
    <p class='text-h5'>My Courses</p>      

    <v-card>
      <v-card-title>
        <v-row>
          <v-col>
            <v-select
              :items="levels"
              label="Select Level"
              outlined
              clearable
              v-on:change="filterLevels"
              v-on:click:clear="resetCourses">
            </v-select>
          </v-col>
          <v-col>
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
              placeholder="Enter Course Code or Course Title to search"
              append-icon="mdi-magnify"
              outlined
              clearable
              single-line>
            </v-text-field>
          </v-col>
        </v-row>       
      </v-card-title>

      <v-data-table
        loading="isLoading"
        :headers="headers"
        :items="filteredCourses"
        :items-per-page="10"
        :search="search"
        v-on:click:row="selectCourse"
        class="elevation-1">
      </v-data-table>
    </v-card>    
  </v-container>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations } from "vuex";
import { viewCourses } from "../data/data";
  export default {
    data () {
      return {
        isLoading: true,
        search: '',
        filteredCourses: [],
        courses: [],
        selectedLevel: '',
        headers:viewCourses.headers,
        levels:viewCourses.levels,
        semesters:viewCourses.semesters,        
      }
    },
    methods: {
      ...mapMutations(["setCourse"]),   
      ...mapGetters(["getToken", "getUser"]),
      async getCourses() {
        const token = this.getToken();
        const user = this.getUser();        
        if(user.role === "student"){
          const registration_no = user.username;
          const result = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/courses/",{
            registration_no,
          });
          //console.log(result.data);
          this.courses = result.data.courses;
        } else {
          const lecturer_id = user.username;
          const result = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/course/lecturer_id/",{
            lecturer_id,
          });
          //console.log(result.data);
          this.courses = result.data.courses;
        }
      },
      filterLevels(selected) {
        if(selected!=null) {
          this.selectedLevel = selected;
          this.filteredCourses = this.courses.filter(course => course.level === selected)
        }        
      },
      filterSemesters(selected) {
        if(selected!=null)
          this.filteredCourses = this.courses.filter(course => course.semester === selected && course.level === this.selectedLevel)
      },
      resetCourses(){
        this.selectedLevel = ''
        this.filteredCourses = this.courses
      },
      resetDisplayed(){
        this.filteredCourses = this.courses.filter(course => course.level === this.selectedLevel)
      },
      selectCourse(course){
        this.setCourse({
          course_code: course.course_code,
            course_title: course.course_title,
            level: course.level,
            semester: course.semester
        });
        //console.log(course);
        this.$router.push("/viewDetailedAttendance");
      }
    },
    async mounted(){
      try {
        this.getCourses().then(() => {
          this.resetCourses();
          this.isLoading = false;
        });
      } catch(err) {
        console.log(err.toString());
      }
    }
  }
</script>
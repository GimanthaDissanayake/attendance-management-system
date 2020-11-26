<template>
  <v-container>
    <p class='text-h5'>View Courses</p>      

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
        :headers="headers"
        :items="filteredCourses"
        :items-per-page="10"
        :search="search"
        class="elevation-1">
      </v-data-table>
    </v-card>    
  </v-container>
</template>

<script>
import { viewCourses } from "../data/data";
  export default {
    data () {
      return {
        search: '',
        filteredCourses: null,
        selectedLevel: '',
        headers:viewCourses.headers,
        courses: viewCourses.courses,
        levels:viewCourses.levels,
        semesters:viewCourses.semesters,
        
      }
    },
    methods: {
      filterLevels(selected) {
        if(selected!=null){
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
      }
    },
    beforeMount(){
      this.resetCourses()
    }
  }
</script>
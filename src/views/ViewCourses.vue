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
  export default {
    data () {
      return {
        search: '',
        filteredCourses: null,
        selectedLevel: '',
        headers: [
            { text: 'Course Code', align: 'start',  value: 'course_code'},
            { text: 'Course Title', value: 'course_title'},
            { text: 'Attendance Percentage', value:'attendance_percentage'},
        ],
        courses: [
            {
                course_code: 'CSC3113',
                course_title: 'Group Project',
                attendance_percentage: '100',
                level: 'Level 3',
                semester: 'Semester 1',
            },
            {
                course_code: 'CSC3122',
                course_title: 'E-commerce and Professional Practice',
                attendance_percentage: '88',
                level: 'Level 3',
                semester: 'Semester 1',
            },
            {
                course_code: 'CSC3132',
                course_title: 'Data Warehousing and Data mining	',
                attendance_percentage: '95',
                level: 'Level 3',
                semester: 'Semester 1',
            },
            {
                course_code: 'CSC3142',
                course_title: 'Internet Services and Protocols	',
                attendance_percentage: '80',
                level: 'Level 3',
                semester: 'Semester 1',
            },
            {
                course_code: 'CSC3172',
                course_title: 'Distributed Systems',
                attendance_percentage: '70',
                level: 'Level 3',
                semester: 'Semester 1',
            },
            {
                course_code: 'CSC2213',
                course_title: 'Rapid Application Development',
                attendance_percentage: '82',
                level: 'Level 2',
                semester: 'Semester 2',
            },
            {
                course_code: 'CSC2222',
                course_title: 'Computer Systems',
                attendance_percentage: '79',
                level: 'Level 2',
                semester: 'Semester 2',
            },
            {
                course_code: 'CSC2133',
                course_title: 'Operating Systems',
                attendance_percentage: '90',
                level: 'Level 2',
                semester: 'Semester 1',
            },
        ],
        levels: [
          'Level 1', 'Level 2', 'Level 3'
        ],
        semesters: [
          'Semester 1', 'Semester 2'
        ]
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
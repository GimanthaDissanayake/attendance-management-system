<template>
  <v-container>
    <p class='text-h5'>View Attendance</p>      
    
    <v-card class="elevation-4">
        <v-card-title>
        <v-text-field
                v-model="search"
                label="Search"
                placeholder="Enter Course Code or Course Title to search"
                append-icon="mdi-magnify"
                outlined
                clearable
                single-line
            ></v-text-field>
        </v-card-title>
        <v-data-table
        :headers="headers"
        :items="courses"
        :search="search"
        >
            <template v-slot:item.attendance_percentage="{ item }">
                <v-chip
                :color="getColor(item.attendance_percentage)"
                dark>
                    {{ item.attendance_percentage }}
                </v-chip>
            </template>
        </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
    data () {
      return {
        search: '',
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
            },
            {
                course_code: 'CSC3122',
                course_title: 'E-commerce and Professional Practice',
                attendance_percentage: '88',
            },
            {
                course_code: 'CSC3132',
                course_title: 'Data Warehousing and Data mining	',
                attendance_percentage: '95',
            },
            {
                course_code: 'CSC3142',
                course_title: 'Internet Services and Protocols	',
                attendance_percentage: '80',
            },
            {
                course_code: 'CSC3172',
                course_title: 'Distributed Systems',
                attendance_percentage: '70',
            },
        ]
      }
    },
    methods: {
        getColor(attendance_percentage){
            if(attendance_percentage < 80) return 'red'
            else if(attendance_percentage > 80) return 'green'
            else return 'orange'
        }
    }
}
</script>

<style>
</style>
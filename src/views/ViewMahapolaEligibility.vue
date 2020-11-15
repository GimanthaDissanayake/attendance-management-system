<template>
  <v-container>
      <p class='text-h5'>View Mahapola Eligibility</p> 

      <v-container v-if="eligibility==true">
        <p class='text-h6'>You are eligibile to receive mahapola for the time period.</p> 
      </v-container>

      <v-container v-if="eligibility==false">
        <p class='text-h6 error--text'>You are not eligibile to receive mahapola for the time period because of your low attendance for below subjects</p>

        <v-data-table
        :headers="headers"
        :items="courses"
        :search="search"
        class="elevation-2"
        ></v-data-table> 
      </v-container>
  </v-container>
</template>

<script>
export default {
    data(){
        return{
            eligibility: false,
            headers: [
                { text: 'Course Code', align: 'start',  value: 'course_code'},
                { text: 'Course Title', value: 'course_title'},
                { text: 'Attendance Percentage', value:'attendance_percentage'},
            ],
            courses: [
                {
                    course_code: 'CSC3113',
                    course_title: 'Group Project',
                    attendance_percentage: '79',
                },
                {
                    course_code: 'CSC3122',
                    course_title: 'E-commerce and Professional Practice',
                    attendance_percentage: '68',
                },
            ]
        }
    },
}
</script>

<style>

</style>
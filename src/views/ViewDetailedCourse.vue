<template>
  <v-container>
      <p class='text-h5'>Detailed Attendance Information</p>  

      <v-card class="mx-4 mb-4 text-body-2">
          <v-container>
            <v-row>
                <v-col cols="6" sm="4" md="4">
                    <v-row>
                        <v-col cols="7" sm="4" md="4">
                            <p>Course Code :</p>
                        </v-col>
                        <v-col>
                            <v-chip>{{course.course_code}}</v-chip>
                        </v-col>
                    </v-row>                      
                </v-col>
                <v-col>
                    <v-btn>
                        View Registered Students
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" sm="4" md="4">
                    <v-row>
                        <v-col cols="7" sm="4" md="4">
                            <p>Course Title :</p>
                        </v-col>
                        <v-col>
                            <v-chip>{{course.course_title}}</v-chip>
                        </v-col>
                    </v-row>                      
                </v-col>
                <v-col>
                    <v-btn>
                        Mark Attendance
                    </v-btn>
                </v-col>
            </v-row>
              <v-row>
                <v-col  cols="6" sm="4" md="4">
                    <v-row>
                        <v-col cols="7" sm="4" md="4">
                            <p>Attendance Percentage :</p>
                        </v-col>
                        <v-col>
                            <v-chip>{{course.overall_attendance_percentage}}</v-chip>
                        </v-col>
                     </v-row>
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
                        </v-data-table>
                    </v-card>
                </v-col>
            </v-row>
          </v-container>
      </v-card>
  </v-container>
</template>

<script>
export default {
    data() {
        return {
            course: {
                course_code: 'CSC1142',
                course_title: 'System Analysis and Design',
                overall_attendance_percentage: '85%'
            },
            headers: [
                { text: 'Date', align: 'start',  value: 'date'},
                { text: 'Attendance Percentage', value: 'percentage'},
            ],
            dates: [
                {
                    date: '12.01.2020',
                    percentage: '100%'
                },
                {
                    date: '19.01.2020',
                    percentage: '90%'
                },
                {
                    date: '26.01.2020',
                    percentage: '100%'
                },
                {
                    date: '02.02.2020',
                    percentage: '95%'
                },
                {
                    date: '09.02.2020',
                    percentage: '80%'
                },
                {
                    date: '16.02.2020',
                    percentage: '40%'
                },
                {
                    date: '23.02.2020',
                    percentage: '100%'
                },
                {
                    date: '12.01.2020',
                    percentage: '100%'
                },
                {
                    date: '12.01.2020',
                    percentage: '60%'
                },
                {
                    date: '12.01.2020',
                    percentage: '80%'
                },
                {
                    date: '12.01.2020',
                    percentage: '78%'
                },
                {
                    date: '12.01.2020',
                    percentage: '100%'
                },
                {
                    date: '12.01.2020',
                    percentage: '90%'
                },
                {
                    date: '12.01.2020',
                    percentage: '50%'
                },
                {
                    date: '12.01.2020',
                    percentage: '60%'
                },
            ],
        }
    },
}
</script>

<style>

</style>
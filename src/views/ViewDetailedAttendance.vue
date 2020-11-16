<template>
  <v-container>
      <p class='text-h5'>View Detailed Attendance</p> 

      <v-card class="mx-4 mb-4 text-body-2">
          <v-container>
            <v-row>
                <v-col cols="6" sm="4" md="4">
                    <v-row>
                        <v-col cols="7" sm="5" md="5">
                            Student Name :
                        </v-col>
                        <v-col>
                            <v-chip>{{student.name}}</v-chip>
                        </v-col>
                    </v-row>                    
                </v-col>
                <v-col cols="6" sm="4" md="4">
                    <v-row>
                        <v-col cols="7" sm="5" md="5">
                            Registration No :
                        </v-col>
                        <v-col>
                            <v-chip>{{student.registration_no}}</v-chip>
                        </v-col>
                    </v-row>                    
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" sm="4" md="4">
                    <v-row>
                        <v-col cols="7" sm="5" md="5">
                            Degree Program :
                        </v-col>
                        <v-col>
                            <v-chip>{{student.degree_program}}</v-chip>
                        </v-col>
                    </v-row>                    
                </v-col>
                <v-col cols="6" sm="4" md="4">
                    <v-row>
                        <v-col cols="7" sm="5" md="5">
                            Course Code :
                        </v-col>
                        <v-col>
                            <v-chip>{{student.course_code}}</v-chip>
                        </v-col>
                    </v-row>                    
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" sm="4" md="4">
                    <v-row>
                        <v-col cols="7" sm="5" md="5">
                            Course Title :
                        </v-col>
                        <v-col>
                            <v-chip>{{student.course_title}}</v-chip>
                        </v-col>
                    </v-row>                    
                </v-col>
                <v-col cols="6" sm="4" md="4">
                    <v-row>
                        <v-col cols="7" sm="5" md="5">
                            Attendance Percentage :
                        </v-col>
                        <v-col>
                            <v-chip>{{student.attendance_percentage}}</v-chip>
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
                            <template v-slot:item.status="{ item }">
                                <v-chip
                                :color="getColor(item.status)"
                                dark>
                                    {{ item.status }}
                                </v-chip>
                            </template>
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
        return{
            student:{
                name: 'Kamal Perera',
                registration_no: 'SC/2021/12291',
                degree_program: 'BCS',
                course_code: 'CSC1142',
                course_title: 'System Analysis and Design',
                attendance_percentage: '85%'
            },
            headers: [
                { text: 'Date', align: 'start',  value: 'date'},
                { text: 'Attendance Status', value: 'status'},
            ],
            dates: [
                {
                    date: '12.01.2020',
                    status: 'present'
                },
                {
                    date: '19.01.2020',
                    status: 'present'
                },
                {
                    date: '26.01.2020',
                    status: 'present'
                },
                {
                    date: '02.02.2020',
                    status: 'present'
                },
                {
                    date: '09.02.2020',
                    status: 'absent'
                },
                {
                    date: '16.02.2020',
                    status: 'present'
                },
                {
                    date: '23.02.2020',
                    status: 'present'
                },
                {
                    date: '12.01.2020',
                    status: 'present'
                },
                {
                    date: '12.01.2020',
                    status: 'present'
                },
                {
                    date: '12.01.2020',
                    status: 'present'
                },
                {
                    date: '12.01.2020',
                    status: 'present'
                },
                {
                    date: '12.01.2020',
                    status: 'present'
                },
                {
                    date: '12.01.2020',
                    status: 'present'
                },
                {
                    date: '12.01.2020',
                    status: 'present'
                },
                {
                    date: '12.01.2020',
                    status: 'present'
                },
            ]
        }
    },
    methods: {
        getColor(status){
            if(status == 'present') return 'green'
            else return 'red'
        }
    }
}
</script>

<style scoped>
</style>
<template>
    <v-container>
        <p class='text-h5'>Attendance Sheet</p> 

        <v-card>
            <v-container>
                <v-row>
                     <v-col cols="14" sm="7" md="7">
                         <v-row>
                             <v-col>
                                 <p>Course Code :</p>
                             </v-col>
                             <v-col>
                                 <v-chip>{{course.course_code}}</v-chip>
                             </v-col>
                             <v-col>
                                 <p>Course Title :</p>
                             </v-col>
                             <v-col>
                                 <v-chip>{{course.course_title}}</v-chip>
                             </v-col>
                         </v-row>
                         <v-row>
                             <v-col>
                                 <p>Date :</p>
                             </v-col>
                             <v-col>
                                 <v-chip>{{course.date}}</v-chip>
                             </v-col>
                             <v-col>
                                 <p>Overall Attendance Percentage :</p>
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
                        :items="students"
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
                date: '11.01.2020',
                overall_attendance_percentage: '85%'
            },
            students: [
                {
                    registration_no : 'SC/2017/10100',
                    name: 'A.B.C silva',
                    status: 'present'
                },
                {
                    registration_no : 'SC/2017/10200',
                    name: 'A.B.C silva',
                    status: 'absent'
                },
                {
                    registration_no : 'SC/2017/10100',
                    name: 'A.B.C silva',
                    status: 'present'
                },
                {
                    registration_no : 'SC/2017/10100',
                    name: 'A.B.C silva',
                    status: 'present'
                },
                {
                    registration_no : 'SC/2017/10100',
                    name: 'A.B.C silva',
                    status: 'absent'
                },
            ],
            headers: [
                { text: 'Registration Number', align: 'start',  value: 'registration_no'},
                { text: 'Name', value: 'name'},
                { text: 'Status', value: 'status'}
            ]
        }
    }
}
</script>

<style>

</style>
<template>
  <v-container>
    <p class='text-h5'>View Registered Students</p>  

    <v-card class="mx-4 mb-4 text-body-2">
        <v-container>
            <v-row>
                <v-col cols="12" sm="6" md="6">
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
                </v-col>
            </v-row>
        </v-container>
        <v-container>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="8">
                    <v-card>
                        <v-card-title>
                            <v-text-field
                            v-model="search"
                            label="Search"
                            placeholder="Enter Student Registration Number or Name to search"
                            append-icon="mdi-magnify"
                            outlined
                            clearable
                            single-line>
                            </v-text-field>
                        </v-card-title>
                        <v-data-table
                        :headers="headers"
                        :items="students"
                        :search="search"
                        :items-per-page="5" >
                            <template v-slot:item.percentage="{ item }">
                                <v-chip
                                :color="getColor(item.percentage)"
                                dark>
                                    {{ item.percentage }}
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
        return {
            search: '',
            course: {
                course_code: 'CSC1142',
                course_title: 'System Analysis and Design',
                overall_attendance_percentage: '85%'
            },
            students: [
                {
                    registration_no : 'SC/2017/10100',
                    name: 'A.B.C silva',
                    percentage: '80'
                },
                {
                    registration_no : 'SC/2017/10200',
                    name: 'A.B.C silva',
                    percentage: '80'
                },
                {
                    registration_no : 'SC/2017/10100',
                    name: 'A.B.C silva',
                    percentage: '100'
                },
                {
                    registration_no : 'SC/2017/10100',
                    name: 'A.B.C silva',
                    percentage: '80'
                },
                {
                    registration_no : 'SC/2017/10100',
                    name: 'A.B.C silva',
                    percentage: '70'
                },
            ],
            headers: [
                { text: 'Registration Number', align: 'start',  value: 'registration_no'},
                { text: 'Name', value: 'name'},
                { text: 'Attendance Percentage', value: 'percentage'}
            ]
        }
    },
    methods: {
        getColor(percentage){
            if(percentage < 80) return 'red'
            else if(percentage > 80) return 'green'
            else return 'orange'
        }
    }
}
</script>

<style>

</style>
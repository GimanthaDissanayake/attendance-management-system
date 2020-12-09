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
                            :search="search"
                            :headers="headers"
                            :items="student"
                            
                            :items-per-page="5" >

                            <template v-slot:student.percentage="{ student }">
                                <v-chip
                                :color="getColor(student.percentage)"
                                dark>
                                    {{ student.percentage }}
                                </v-chip>
                            </template>
                             <template v-slot:item.actions="{ item }">            
                                <v-btn
                                    small
                                    @click="deleteItem(item)">
                                    <v-icon>mdi-message-alert</v-icon>
                                    Send Alert      
                                </v-btn>
                            </template>
                            
                            
                            <template>            
                                <v-btn
                                    small
                                    >
                                        <v-icon>mdi-delete</v-icon>
                                            Send Alert      
                                </v-btn>            
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
import { viewRegisteredStudents } from '../data/data';
import axios from 'axios';
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            course:[],
            student:[],
            search:'',
            //search: '',
           // course:viewRegisteredStudents.course,
            //students: viewRegisteredStudents.students,
            headers:viewRegisteredStudents.headers,
            
        }
    },
    methods: {
        ...mapGetters(["getCourse"]),
        
        getColor(percentage){
            if(percentage < 80) return 'red'
            else if(percentage > 80) return 'green'
            else return 'orange'
        },
        async setData(){
            this.course = this.getCourse();
            //this.selectedDate = this.$store.state.selectedDate;
            const course_code = this.course.course_code;
            //const co_id = this.course.co_id;
            //const date = this.selectedDate;
        //     this.date = this.getDate();
            // console.log(this.selectedDate);
            console.log(this.course.co_id);
            //const year = '2020';

             return await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/course_code/",{
             course_code,
             })
             .then(async result => {
                this.student = result.data.students;
                console.log(result);
               // this.date_time = attendanceData.date_time;               
            })
            .catch(err => {
                console.log(err);
            });
        }
    },
    async created() {
        await this.setData();
    }
}
</script>

<style>

</style>
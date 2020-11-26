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
                            <template v-slot:item.alert="{ item }">
                                <v-btn
                                    :color="red"
                                >
                                    {{ item.alert }}
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
export default {
    data() {
        return {
            search: '',
            course:viewRegisteredStudents.course,
            students: viewRegisteredStudents.students,
            headers:viewRegisteredStudents.headers,
            
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
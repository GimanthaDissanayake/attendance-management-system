<template>
  <v-container>
      <v-row>
        <p class='text-h5'>View All Students</p>  
      </v-row> 
    <v-row>
        <v-col>
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
                            v-on:click:clear="resetStudents">
                            </v-select>
                        </v-col>
                        <v-col>
                            <v-select
                            :items="degrees"
                            label="Select Degree Program"
                            outlined
                            clearable
                            :disabled = "this.selectedLevel==''"
                            v-on:change="filterDegrees"
                            v-on:click:clear="resetDisplayed">
                            </v-select>
                        </v-col>
                        <v-col>
                            <v-text-field
                            v-model="search"
                            label="Search"
                            placeholder="Enter Registration Number or Name to search"
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
                :items="filteredStudents"
                :items-per-page="10"
                :search="search"
                v-on:click:row="selectStudent"
                class="elevation-1">
                </v-data-table>
            </v-card>
        </v-col>
    </v-row>
      
  </v-container>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations } from "vuex";
import { viewAllStudents } from "../data/data";
export default {
    data() {
        return {
            search: '',
            filteredStudents: [],
            selectedLevel: '',
            selectedDegree: '',
            headers:viewAllStudents.headers,
            students:[],
            levels:viewAllStudents.levels,
            degrees:viewAllStudents.degrees,
        }
    },
    methods: {
        ...mapMutations(["setStudent"]),   
        ...mapGetters(["getToken", "getUser"]),
        filterLevels(selected) {
            if(selected!=null){
            this.selectedLevel = selected;
            this.filteredStudents = this.students.filter(student => student.level === selected)
            }        
        },
        filterDegrees(selected){
            if(selected!=null){
                this.selectedDegree = selected;
                this.filteredStudents = this.students.filter(student => student.level === this.selectedLevel && student.degree_name === selected);
            }
        },
        resetStudents(){
            this.selectedLevel = ''
            this.filteredStudents = this.students;
        },
        resetDisplayed(){
            this.filteredStudents = this.students.filter(student => student.level === this.selectedLevel)
        },
        async getStudents() {
            const token = this.getToken();
            const user = this.getUser();        
            const mentor_id = user.username;
            const result = await axios.get(process.env.VUE_APP_BACKEND_SERVER + "/api/student/");
            //console.log(result);
            this.students = result.data.students;
            //console.log(this.students);
        },
        selectStudent(student){
            const user = this.getUser();   
            this.setStudent({
            registration_no: student.registration_no,
            name: student.student_name,
            mentor_name: user.name,
            mentor_id: user.mentor_id,
            degree_program: student.degree_name
            });
            this.$store.state.selectedStudent = true;
            this.$router.push("/viewCourses");
        },
    },
    // beforeMount(){
    //   this.resetStudents()
    // },
    async mounted(){
      try {
        this.getStudents().then(()=>{
          this.resetStudents();
        //this.isLoading = false;
        })        
      } catch(err) {
        console.log(err.toString());
      }
    }
}
</script>

<style>

</style>
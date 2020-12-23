<template>
  <v-container>
    <v-row>
      <p class='text-h5'>View Mentor Groups</p> 
    </v-row>     
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <v-row>
              <v-col cols="4">
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
                <v-text-field
                  v-model="search"
                  label="Search"
                  placeholder="Enter Registration Number or Name to Search"
                  append-icon="mdi-magnify"
                  outlined
                  clearable
                  single-line>
                </v-text-field>
              </v-col>
            </v-row>       
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="filteredStudents"
              :items-per-page="10"
              :search="search"
              v-on:click:row="selectStudent"
              class="elevation-1">
            </v-data-table>
          </v-card-text>      
        </v-card>    
      </v-col>
    </v-row>   
  </v-container>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations } from "vuex";
import { viewMentorGroups } from "../data/data";
  export default {
    data () {
      return {
        search: '',
        filteredStudents: [],
        selectedLevel: '',
        headers: viewMentorGroups.headers,
        students: [],
        levels: viewMentorGroups.levels,       
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
      resetStudents(){
        this.selectedLevel = ''
        this.filteredStudents = this.students
      },
      resetDisplayed(){
        this.filteredStudents = this.students.filter(student => student.level === this.selectedLevel)
      },
      async getStudents() {
        const token = this.getToken();
        const user = this.getUser();        
        const mentor_id = user.username;
        const result = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/mentor/",{
          mentor_id,
        });
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
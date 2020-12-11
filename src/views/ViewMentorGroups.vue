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
                <v-text-field
                  v-model="searchReg"
                  label="Search"
                  placeholder="Enter Registration Number"
                  append-icon="mdi-magnify"
                  outlined
                  clearable
                  single-line>
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="searchName"
                  label="Search"
                  placeholder="Enter Name"
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
              :search="searchReg || searchName"
              class="elevation-1">
            </v-data-table>
          </v-card-text>      
        </v-card>    
      </v-col>
    </v-row>   
  </v-container>
</template>

<script>
import { viewMentorGroups } from "../data/data";
  export default {
    data () {
      return {
        searchReg: '',
        searchName: '',
        filteredStudents: null,
        selectedLevel: '',
        headers: viewMentorGroups.headers,
        students: viewMentorGroups.students,
        levels: viewMentorGroups.levels,
       
      }
    },
    methods: {
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
      }
    },
    beforeMount(){
      this.resetStudents()
    }
  }
</script>
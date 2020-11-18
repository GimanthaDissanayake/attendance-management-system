<template>
  <v-container>
      <p class='text-h5'>View Students</p>   

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
        class="elevation-1">
        </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
    data() {
        return {
            search: '',
            filteredStudents: null,
            selectedLevel: '',
            headers: [
                { text: 'Registration Number', align: 'start',  value: 'registration_no'},
                { text: 'Name', value: 'name'},
            ],
            students: [
                {
                    registration_no: 'SC/2017/10030',
                    name: 'Heshan Jayasinghe',
                    level: 'Level 3',
                    degree: 'BCS'
                },
                {
                    registration_no: 'SC/2017/10031',
                    name: 'Gimantha Dissanayake',
                    level: 'Level 3',
                    degree: 'BCS'
                },
                {
                    registration_no: 'SC/2017/10032',
                    name: 'Ramesh Shanilka',
                    level: 'Level 2',
                    degree: 'BCS'
                },
                {
                    registration_no: 'SC/2017/10033',
                    name: 'Dinuka Heshan',
                    level: 'Level 1',
                    degree: 'BSC'
                },
            ],
            levels: [
                'Level 1', 'Level 2', 'Level 3'
            ],
            degrees: [
                'BSC', 'BCS'
            ],
        }
    },
    methods: {
        filterLevels(selected) {
            if(selected!=null){
                this.selectedLevel = selected;
                this.filteredStudents = this.students.filter(student => student.level === selected)
            }        
        },
        filterDegrees(selected) {
            if(selected!=null)
                this.filteredStudents = this.students.filter(student => student.degree === selected && student.level === this.selectedLevel)
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

<style>

</style>
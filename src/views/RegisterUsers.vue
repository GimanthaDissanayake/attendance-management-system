<template>
  <v-container>
    <p class='text-h5'>Register a Student for Face-Recognition</p> 

    <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step
        :complete="e1 > 1"
        step="1">
        Select a Student
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step
        :complete="e1 > 2"
        step="2">
        Upload an Image
      </v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
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
                  :items-per-page="10" 
                  v-on:click:row="selectStudent">
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-container>
          <v-row>
            <v-col cols="6" sm="6" md="6">
              <v-row>
                <v-col cols="7" sm="5" md="5">
                  Student Name :
                </v-col>
                <v-col>
                  <v-chip>{{student.name}}</v-chip>
                </v-col>
              </v-row>                    
            </v-col>
            <v-col cols="6" sm="6" md="6">
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
            <v-file-input
              placeholder="Pick the image"
              prepend-icon="mdi-camera"
              label="Upload image"
              v-model="imageFile"
              v-on:change="setImage">
            </v-file-input>
          </v-row> 
          <v-row>
            <v-spacer></v-spacer>
            <v-img
              max-height="250"
              max-width="350"
              contain
              :src="image">
            </v-img>
            <v-spacer></v-spacer>
          </v-row> 
          <v-row>
            <v-btn
              @click="e1 = 1; image=null; imageFile=null"> 
              Previous
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              class="primary"
              @click="uploadImage"> 
              Upload Image
            </v-btn>
          </v-row> 
        </v-container>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
  </v-container>
</template>

<script>
import axios from 'axios';
import { mapGetters } from "vuex";
import { registerUsers } from "../data/data";
  export default {
    data () {
      return {
        search: '',
        students: [],
        headers:registerUsers.headers,
        student:'',
        image: null,
        imageFile: null,
        e1: 1,
      }
    },
    methods: {
      ...mapGetters(["getToken"]),
      async getStudents() {
        const token = this.getToken();
        const result = await axios.get(process.env.VUE_APP_BACKEND_SERVER + "/api/student/");
        this.students = result.data.students;
      },
      selectStudent(student) {
        this.student = {
          name : student.student_name,
          registration_no : student.registration_no
        };
        this.e1 = 2;
      },
      setImage() {
        const fr = new FileReader ();
        fr.readAsDataURL(this.imageFile);
        fr.addEventListener('load', () => {
					this.image = fr.result
				})
      },
      async uploadImage() {
        const imageFile = this.imageFile;
        const indexNumber = this.student.registration_no;
        await axios.post(process.env.VUE_APP_FLASK_SERVER+'/save/', {
          imageFile,
          indexNumber
        },{
          headers: {'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization'}
        })
        .then(result => {
          console.log(result)
          this.e1 = 1;
        }).catch(err => {
          console.log(err);
        });
      }
    },
    async mounted(){
      try {
        await this.getStudents();
      } catch(err) {
        console.log(err.toString());
      }
    }
  }
</script>
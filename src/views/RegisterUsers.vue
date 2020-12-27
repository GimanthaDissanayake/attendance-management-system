<template>
  <v-container>
    <v-row>
    <p class='text-h5'>Register a Student for Face-Recognition</p> 
    </v-row>
    <v-row>
      <v-col>
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
                  <v-col>
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
                        :sort-by="['status']"
                        :loading="isLoading"
                        loading-text="Loading... Please wait"
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
                <v-progress-linear v-if="isLoading"
                  color="primary"
                  indeterminate
                  rounded
                  height="6"
                ></v-progress-linear>
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
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar"
      :timeout="2000">
        {{ snackbarText }}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="secondary"
            text
            v-bind="attrs"
            @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
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
        snackbar: false,
        snackbarText: '',
        isLoading: false
      }
    },
    methods: {
      ...mapGetters(["getToken"]),
      async getStudents() {
        this.isLoading = true;
        const token = this.getToken();
        const allStudents = await axios.get(process.env.VUE_APP_BACKEND_SERVER + "/api/student/everyone/");

        const registeredStudents = await axios.get(process.env.VUE_APP_FLASK_SERVER + "/registered");

        allStudents.data.students.forEach(student => {
          if(registeredStudents.data.id_list.includes(student.registration_no))
            student.status = 'Registered';
          else
            student.status = 'Not Registered';
        });

        this.students = allStudents.data.students;

        this.isLoading = false;
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
        let formData = new FormData();
        formData.append('imageFile', imageFile);
        formData.append('indexNumber', indexNumber);
        this.isLoading = true;
        await axios.post(process.env.VUE_APP_FLASK_SERVER+'/save', formData)
        .then(result => {
          this.snackbar = true;
          if(result.status===200) {
            this.snackbarText = 'Image Saved Successfully!';
            this.e1 = 1;
            this.image = null;
            this.imageFile = null;
          }
          else {
            this.snackbarText = 'There was a Problem Saving the Image!';
          }
          this.isLoading = false;
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
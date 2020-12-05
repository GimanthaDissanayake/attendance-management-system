<template>
  <div>
    <p class='text-h5'>Mark attendance</p> 
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step
          :complete="e1 > 1"
          step="1">
          Select the course unit
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          :complete="e1 > 2"
          step="2">
          Mark attendance
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">
          Confirm attendance
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">        
          <v-container>
            <v-layout row wrap style="padding: 15px">
              <v-flex md9 xs12>
                <v-layout row>
                  <v-flex md3 xs12>
                    <v-layout>
                      <v-flex md9 mx9>
                        Course details :
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex md3 xs12>
                    <v-select 
                      :items="v_select_course_codes"
                      item-text="course_code" 
                      item-value="course_code"
                      :placeholder="courses[0].course_code"
                      label="Select Course"
                      @input="changedCourseCode"/>            
                  </v-flex>
                  <v-flex md3 xs12>
                    <v-select 
                      :items="v_select_type"
                      item-text="" 
                      item-value=""
                      :placeholder="courses[0].type"
                      label="Select Type"
                      @input="changedType"/>
                  </v-flex>                
                  <v-flex md3 xs12>
                    <v-select 
                      :items="v_select_level"
                      item-text="" 
                      item-value=""
                      :placeholder="courses[0].level"
                      label="Select Level"
                      @input="changedLevel"/>                  
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-layout row wrap style="padding: 15px">
              <v-flex md9 xs12>
                <v-layout row wrap>
                  <v-flex md3 xs12>
                    <v-layout>
                      <v-flex md9 mx9>
                        Start Time :
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex md3 xs12>
                    <vue-timepicker 
                        v-model="courses[0].start_time" 
                      format="HH" 
                      @input="STimeHandler">
                    </vue-timepicker>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex md3 xs12>
                    <v-layout>                    
                      <v-flex md9 mx9>
                        End Time :
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex md3 xs12>
                    <vue-timepicker 
                      v-model="courses[0].end_time" 
                      format="HH" 
                      @input="ETtimeHandler">
                    </vue-timepicker>
                  </v-flex>
                </v-layout>                
              </v-flex>
                <v-btn
                    color="primary"
                    @click="e1 = 2">
                    Mark attendance
                  </v-btn>
              </v-layout>  
            </v-container>
        </v-stepper-content>

        <v-stepper-content step="2">
          <table>
            <tr>
              <td >
                <vue-web-cam
                  ref="webcam"
                  :device-id="deviceId"  
                  @cameras="onCameras"
                />
                  <!--before@cameras @error="onError" -->
                  <!--afterdevice-id @stopped="onStopped" -->
                  <!--secondevent @started="onStarted" -->
                  <!--lastevent @camera-change="onCameraChange" -->
              </td>
              <td>
                  <img :src="img" width="100%" />
              </td>
            </tr>
          </table>
          <div style="margin-bottom: 35px;">
            <v-btn        
            @click="onCapture"
            text>
              <span v-if="img === null">Mark attendance</span>
              <span v-else >Retake Image</span>
            </v-btn> 
            <v-btn
              color="primary"
              @click="e1 = 3">
              Continue
            </v-btn>
          </div>        
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-container>
            <v-layout row wrap>
              <v-flex md3 xs12>
                Number of present students : {{ presentStudents}}
              </v-flex>
              <v-flex md6 xs12>
              </v-flex>
              <v-flex md3 xs12>
                Attendance percentage : {{ (presentStudents / registeredStudentsLength ) * 100  }} %
              </v-flex> 
            </v-layout>
            <br>
            <v-data-table
              :headers="headers"
              :items="absentStudents"
              sort-by="registraion_no"
              class="elevation-1"
              flat>
              <template v-slot:top>
                <v-toolbar
                flat>
                  <v-toolbar-title>Absent Students</v-toolbar-title>
                  <v-divider
                    class="mx-4"
                    inset
                    vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog
                    v-model="dialog"
                    max-width="500px">
                
                  </v-dialog>
                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                          <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">            
                <v-btn
                  small
                  @click="deleteItem(item)">
                  <v-icon>mdi-delete</v-icon>
                  Remove      
                </v-btn>            
              </template>
            </v-data-table>
            <br>
            Add unregistered students
            <v-layout row wrap>
              <v-flex md2 xs6>
                <v-text-field
                  label="SC/20XX/XXXX"
                  v-model="addUnreg">
                </v-text-field>      
              </v-flex>
              <v-flex md4 xs6>
                <v-btn
                  @click="addUnregisteredStudents">
                  Add
                </v-btn>
              </v-flex>
              <v-flex md4 xs6>
                <v-btn
                  color="primary"
                  @click="e1 = 1">
                  Confirm Attendance
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from "vuex";
import { markAttendance } from "../data/data";
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'
import { WebCam } from "vue-web-cam";

export default {
  name: "App",
  components: {
    "vue-web-cam": WebCam,
    VueTimepicker,
  },
  data(){
    return{
      e1: 1,
      //table header
      headers : markAttendance.headers,

      //stepper 3 props
      registeredStudents: [],
      registeredStudentLength: '',
      recognizedStudents: [ 'SC/2017/10271' ],
      absentStudents: [],
      addUnreg:'',
      removedStudent: '',
      presentStudents: '',
      attendancePercentage: '',
      datas: [],
      dialogDelete: false,

      //stepper 1 props
      v_select_course_codes: [],
      v_select_level: ['Level 1', 'Level 2','Level 3'],
      v_select_type: ['Theory', 'Practical'],
      selectedType: null,
      selectedCourseCode: null,
      selectedLevel: null,
      STenteredValue:'',
      ETenteredValue: '',
      courses: [],   

      //stepper 2 props
      img: null,
      devices: [],      
    }
  },
  methods: {
    ...mapGetters(["getToken", "getUser"]),
    
    async setData(){
      const token = this.getToken();
      const user = this.getUser();    
      const lecturer_id = user.username;
      
      //stepper 1
      //auto fill form date
      const result = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/course/course_time/",{
          lecturer_id,
      });

      //stepper 3
      // get courses list of the current lecture
      const res = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/course/lecturer_id/",{
          lecturer_id,
      });


      //course codes conduct by current lecturer
      this.v_select_course_codes = res.data.courses;


      //All courses conduct by lecuterer current date
      const returnedCourses = result.data.courses;

      //if current day has two courses , find the course
      if(returnedCourses.length > 0){
        var d = new Date();
        //var n = d.getHours(); //===================================================  must uncomment this
        var n = 3;

        for(var i = 0; i < returnedCourses.length;i++){
          var s_t = returnedCourses[i].start_time.slice(11,13);
          var e_t = returnedCourses[i].end_time.slice(11,13);

          //find the start time and end time using current time
          if(s_t < n && e_t > n){          
            this.start_time = s_t;
            this.end_time = e_t;
            this.course_code = returnedCourses[i].course_code;
            this.level = returnedCourses[i].level;
            this.type = returnedCourses[i].type;

            const mappedCourses = [];

            returnedCourses.map(course => {
              course.start_time = this.start_time;
              course.end_time = this.end_time;
              course.course_code = this.course_code;
              course.level = this.level;
              course.type = this.type;
              mappedCourses.push(course);
            }); 

            //return final course details
            this.courses = mappedCourses;
          }          
        }
      } 

      //stepper 3
      // get registered student list for current course
      const course_code = this.courses[0].course_code;
      const registeredStudentResult = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/course_code/",{
          course_code,
      });
      
      //return registered students
      this.registeredStudents = registeredStudentResult.data.students;

      // logic for find absent student list
      var flag,i,j;
      for ( i = 0 ; i < this.registeredStudents.length; i++ ) {
        flag = 0;
        for (  j = 0; j < this.recognizedStudents.length;  j++ ) {
          if(this.registeredStudents[i].registration_no ==  this.recognizedStudents[j]){
            flag = 1;
          }  
        }
        if(flag == 0){
          this.absentStudents.push(this.registeredStudents[i]); 
        }
      }    

      //Add unregistered

      //find present students
      this.presentStudents = this.registeredStudents.length - this.absentStudents.length;
  
      //find the attendance presentage
      this.registeredStudentsLength = this.registeredStudents.length;

    },
    addUnregisteredStudents(){
      this.recognizedStudents.push(this.addUnreg);
      console.log(this.recognizedStudents)
    },
    //stepper 1 on change methods
    changedType(event) {
      if(event == 'Theory'){
        this.selectedType = 'theory';
      }else if(event == 'Practical'){
        this.selectedType = 'practical';
      }
    },
    changedLevel(event){
      this.selectedLevel = event;
    },
    changedCourseCode(event){
      this.selectedCourseCode = event;
    },
    //start_time time picker
    STtimeHandler (val) {
      this.STenteredValue = val;
    },
    //end_time time picker
    ETtimeHandler (val) {
      this.ETenteredValue = val;
    },
    //stepper 2 camera methods
    onCapture() {  
      this.img = this.$refs.webcam.capture();
      console.log(this.img);
      //var img; // get imagedata from POST request 
    },
    onCameras(cameras) {
      this.devices = cameras;
      console.log("On Cameras Event", cameras);
    },    
    capture(){
      this.$refs.webcam.start();
      this.img = this.$refs.webcam.capture();
      // console.log(this.img);
    },      
    // stepper 3 methods
    deleteItem (item) {
      this.editedIndex = this.absentStudents.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
      this.removedStudent = item.registraion_no;
    },
    deleteItemConfirm () {
      this.absentStudents.splice(this.editedIndex, 1)
      this.closeDelete()
      this.presentStudents++ ;
      this.presentStudents.push(this.removedStudent);
      console.log(this.presentStudents);
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
  },
  watch: {
    //stepper 3
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
    // stepper 2 memthods
    devices: function() {
      // Once we have a list select the first one
      const [first, ...tail] = this.devices;
      if (first) {
        this.camera = first.deviceId;
        this.deviceId = first.deviceId;
      }
    }      
  },
  async created(){
    try{
      await this.setData();
    } catch(err){
      console.log(err);
    }
  }    
}
</script>
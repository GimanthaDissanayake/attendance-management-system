<template>
  <v-container>
    <v-row>
      <p class='text-h5'>Mark Attendance</p> 
    </v-row>
    <v-row>
      <v-col>
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step
              :complete="e1 > 1"
              step="1">
              Select the Course Unit
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step
              :complete="e1 > 2"
              step="2">
              Mark Attendance
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3">
              Confirm Attendance
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">        
              <v-container>
                <v-progress-linear v-if="isLoading"
                color="primary"
                indeterminate
                rounded
                height="6"
                ></v-progress-linear>
                <v-row wrap style="padding: 15px">
                  <v-col md3 xs12>
                    Course details:
                  </v-col>
                  <v-col md3 xs12>
                    <v-select 
                      :items="v_select_course_codes"
                      item-text="course_code" 
                      item-value="course_code"
                      :placeholder="courses[0].course_code"
                      label="Select Course"
                      @input="changedCourseCode"/>            
                  </v-col>
                  <v-col md3 xs12>
                    <v-select 
                      :items="v_select_type"
                      item-text="" 
                      item-value=""
                      :placeholder="courses[0].type"
                      label="Select Type"
                      @input="changedType"/>
                  </v-col>                
                  <v-col md3 xs12>
                    <v-select 
                      :items="v_select_level"
                      item-text="" 
                      item-value=""
                      :placeholder="courses[0].level"
                      label="Select Level"
                      @input="changedLevel"/>                  
                  </v-col>
                </v-row>
                <v-row wrap style="padding: 15px">
                  <v-spacer></v-spacer>
                  <v-col>
                    <v-row>
                      <v-col>
                        Start Time:
                      </v-col>
                      <v-col>
                        <v-time-picker
                          v-model="startTime"
                          format="24hr">
                        </v-time-picker>
                      </v-col>
                    </v-row>                     
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col>
                    <v-row>
                      <v-col>
                        End Time:
                      </v-col>
                      <v-col>
                        <v-time-picker
                          v-model="endTime"
                          format="24hr">
                        </v-time-picker>
                      </v-col>
                    </v-row>               
                  </v-col>
                  <v-spacer></v-spacer>              
                </v-row>  
                <v-row>
                  <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      @click="setRegisteredStudentData">
                        Mark attendance
                    </v-btn>
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
                
                <v-row align="center" justify="center">
                  <v-col 
                    cols="12"
                    sm="6">
                    <vue-web-cam
                      ref="webcam"
                      :device-id="deviceId"
                      @error="onError"
                      @cameras="onCameras"
                      @camera-change="onCameraChange"
                    />
                      <!--before@cameras @error="onError" -->
                      <!--afterdevice-id @stopped="onStopped" -->
                      <!--secondevent @started="onStarted" -->
                      <!--lastevent @camera-change="onCameraChange" -->
                  </v-col>
                  <v-col 
                    cols="12"
                    sm="6">
                      <v-img :src="img"></v-img>
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col cols="3">
                    <v-subheader>
                      Select Camera
                    </v-subheader>
                  </v-col>
                  <v-col cols="3">
                    <select
                      v-model="camera"
                    >
                    <option
                      v-for="device in devices"
                      :key="device.deviceId"
                      :value="device.deviceId"
                    >
                      <h6>{{ device.label }}</h6>
                    </option>
                    </select>
                  </v-col>
                </v-row>
                <v-row  align="center" justify="center">
                  <v-col>
                    <v-btn
                    @click="e1=1; img=null;">
                      Previous
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn   
                    class="primary"     
                    @click="onCapture"
                    text>
                      <span v-if="img === null">Mark attendance</span>
                      <span v-else >Retake Image</span>
                    </v-btn> 
                  </v-col>
                  <v-col>
                    <v-btn
                      color="primary"
                      v-if="img != null"
                      @click="submitImage">
                      Continue
                    </v-btn>
                  </v-col>
                </v-row> 
              </v-container>       
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-container>
                <v-progress-linear v-if="isLoading"
                color="primary"
                indeterminate
                rounded
                height="6"
                ></v-progress-linear>
                <v-row>
                  <v-col>
                    Number of present students : {{ presentStudents}}
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col>
                    Attendance percentage : {{ (presentStudents / registeredStudentsLength ) * 100  }} %
                  </v-col> 
                </v-row>
                <br>
                <v-row width=100%>
                  <v-col>
                    <v-data-table
                      :headers="headers"
                      :items="absentStudents"
                      sort-by="registraion_no"
                      class="elevation-1"
                      flat>
                      <template v-slot:top>
                        <v-toolbar
                        flat>
                          <v-toolbar-title>Absent Students List</v-toolbar-title>
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
                  </v-col>              
                </v-row>
                <br>
                Add unregistered students
                <v-row>
                  <v-col>
                    <v-text-field
                      label="SC/20XX/XXXX"
                      v-model="addUnreg">
                    </v-text-field>     
                  </v-col>
                  <v-col>
                    <v-btn
                      @click="addUnregisteredStudents">
                      Add
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                    @click="e1=2">
                      Previous
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      color="primary"
                      @click="uploadAttendance">
                      Confirm Attendance
                    </v-btn>
                  </v-col>
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
import { markAttendance } from "../data/data";
import { WebCam } from "vue-web-cam";

export default {
  name: "App",
  components: {
    "vue-web-cam": WebCam,
  },
  data(){
    return{
      e1: 1,
      isLoading: false,
      snackbar: false,
      snackbarText: '',
      //table header
      headers : markAttendance.headers,

      //stepper 3 props
      registeredStudents: [],
      registeredStudentsLength: 0,
      recognizedStudents: [],
      absentStudents: [],
      addUnreg:'',
      removedStudent: '',
      presentStudents: '',
      dialogDelete: false,
      dialog: null, //?????

      //stepper 1 props
      v_select_course_codes: [],
      v_select_level: ['Level 1', 'Level 2','Level 3'],
      v_select_type: ['Theory', 'Practical'],
      selectedType: null,
      selectedCourseCode: null,
      selectedLevel: null,
      courses: [{
        co_id: "",
        course_code: "",
        course_title: "",
        day_of_week: "",
        end_time: "",
        level: "",
        semester: "",
        start_time: "",
        type: ""
      }],   
      startTime: "",
      endTime: "",
      //stepper 2 props
      img: null,
      deviceId: '',
      devices: [],  
      camera:'',    
    }
  },
  watch: {
    //stepper 3
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
    // stepper 2 methods
     camera: function(id) {
            this.deviceId = id;
        },
    devices: function() {
      // Once we have a list select the first one
      const [first, ...tail] = this.devices;
      if (first) {
        this.camera = first.deviceId;
        this.deviceId = first.deviceId;
      }
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
      // const result = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/course/course_time/",{
      //     lecturer_id,
      // });
      //console.log(result);
      //stepper 3
      // get courses list of the current lecturer
      const res = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/course/lecturer_id/",{
          lecturer_id,
      });

      //course codes conduct by current lecturer
      this.v_select_course_codes = res.data.courses;

      //get the current day of the week
      const currentDayOfWeek = new Date().getDay();

      //get courses conducted on current day of week
      const mappedCourses = [];
       await res.data.courses.map(course => {
         if(course.day_of_week=currentDayOfWeek)
          mappedCourses.push(course);
       });

      //All courses conduct by lecuterer current date
      // const returnedCourses = result.data.courses;
      const returnedCourses = mappedCourses;
      this.courses = returnedCourses;
      //if current day has more than one course , set a course
      if(returnedCourses.length > 0){
        //get the hour of current time
        var currentHour = new Date().getHours();

        //select a course going on at current time
        const mappedCourses = [];
        await returnedCourses.forEach(c => {
          const st = parseInt(c.start_time.split('T')[1].split(':')[0]);
          const et = parseInt(c.end_time.split('T')[1].split(':')[0]);
          if(currentHour>=st && currentHour<et) {
            mappedCourses.push(c);
          }
        });
        if(mappedCourses.length > 0)
          this.courses = mappedCourses;

        this.startTime = this.courses[0].start_time.split('T')[1].split(':')[0]+':'+'00';
        this.endTime = this.courses[0].end_time.split('T')[1].split(':')[0]+':'+'00';
        //var n = d.getHours(); //===================================================  must uncomment this
        // var n = 3;

        // for(var i = 0; i < returnedCourses.length;i++){
        //   var s_t = returnedCourses[i].start_time.slice(11,13);
        //   var e_t = returnedCourses[i].end_time.slice(11,13);

        //   //find the start time and end time using current time
        //   if(s_t < n && e_t > n){    
        //     this.start_time = s_t;
        //     this.end_time = e_t;
        //     this.course_code = returnedCourses[i].course_code;
        //     this.level = returnedCourses[i].level;
        //     this.type = returnedCourses[i].type;

        //     const mappedCourses = [];

        //     returnedCourses.map(course => {
        //       course.start_time = this.start_time;
        //       course.end_time = this.end_time;
        //       course.course_code = this.course_code;
        //       course.level = this.level;
        //       course.type = this.type;
        //       mappedCourses.push(course);
        //     }); 

        //     //return final course details
        //     this.courses = mappedCourses;
        //   }          
        // }
      }else if(returnedCourses.length == 0){
        this.courses = this.v_select_course_codes
        this.startTime = this.courses[0].start_time.split('T')[1].split(':')[0]+':'+'00';
        this.endTime = this.courses[0].end_time.split('T')[1].split(':')[0]+':'+'00';
      }

      //stepper 3
      // get registered student list for current course
      // const course_code = this.courses[0].course_code;
      // const registeredStudentResult = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/course_code/",{
      //     course_code,
      // });
      // console.log(registeredStudentResult);
      // //return registered students
      // this.registeredStudents = registeredStudentResult.data.students;

      // // logic for find absent student list
      // var flag,i,j;
      // for ( i = 0 ; i < this.registeredStudents.length; i++ ) {
      //   flag = 0;
      //   for (  j = 0; j < this.recognizedStudents.length;  j++ ) {
      //     if(this.registeredStudents[i].registration_no ==  this.recognizedStudents[j]){
      //       flag = 1;
      //     }  
      //   }
      //   if(flag == 0){
      //     this.absentStudents.push(this.registeredStudents[i]); 
      //   }
      // }    

      // //Add unregistered

      // //find present students
      // this.presentStudents = this.registeredStudents.length - this.absentStudents.length;
  
      // //find the attendance presentage
      // this.registeredStudentsLength = this.registeredStudents.length;

    },
    async setRegisteredStudentData(){
      this.isLoading = true;
      // get registered student list for current course
      const course_code = this.selectedCourseCode || this.courses[0].course_code;
      const registeredStudentResult = await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/course_code/",{
          course_code,
      });
      //console.log(registeredStudentResult);
      //return registered students
      this.registeredStudents = registeredStudentResult.data.students;
      this.isLoading = false;
      this.e1 = 2;
    },
    addUnregisteredStudents(){
      if(this.addUnreg != '')
        this.recognizedStudents.push(this.addUnreg);
      //console.log(this.recognizedStudents)
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
      //console.log(event);
      this.selectedLevel = event;
    },
    changedCourseCode(event){
      this.selectedCourseCode = event;
    },
    //stepper 2 camera methods
    onCapture() {  
      this.img = this.$refs.webcam.capture();
    },
    onCameras(cameras) {
      this.devices = cameras;
    },    
    capture(){
      this.$refs.webcam.start();
      this.img = this.$refs.webcam.capture();
    },
    onCameraChange(deviceId) {
      this.deviceId = deviceId;
      this.camera = deviceId;
    },
    b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;
        var byteCharacters = atob(b64Data);
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
    },   
    async submitImage(){
      this.isLoading = true;
      var imageURL = this.img;
      // Split the base64 string in data and contentType
      var block = imageURL.split(";");
      // Get the content type of the image
      var contentType = block[0].split(":")[1];// In this case "image/jpeg"
      // get the real base64 content of the file
      var realData = block[1].split(",")[1];
      // Convert it to a blob to upload
      var blob = this.b64toBlob(realData, contentType);      
      //create formdata object to send to server
      let formData = new FormData();
      formData.append('unknownImage', blob);
      //this.isLoading = true;
        await axios.post(process.env.VUE_APP_FLASK_SERVER+'/recognize', formData)
        .then(result => {
          //this.snackbar = true;
          if(result.status===200) {
            //console.log(result.data.names);
            this.recognizedStudents = result.data.names;
            // this.snackbarText = 'Image Saved Successfully!';
            this.setStepper3Data();
            this.isLoading = false;
            this.e1 = 3;
            this.img = null;
          }
          else {
            // this.snackbarText = 'There was a Problem Saving the Image!';
            console.log(result);
            this.isLoading = false;
          }
          // this.isLoading = false;
        }).catch(err => {
          console.log(err);
          this.isLoading = false;
        });
    },   
    // stepper 3 methods
    setStepper3Data(){     
      // // logic for find absent student list
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
    deleteItem (student) {
      //console.log(student);
      this.editedIndex = this.absentStudents.indexOf(student)
      this.editedItem = Object.assign({}, student)
      this.dialogDelete = true;
      this.removedStudent = student.registration_no;
      //console.log(this.removedStudent);
    },
    deleteItemConfirm () {
      this.absentStudents.splice(this.editedIndex, 1)
      this.closeDelete()
      this.recognizedStudents.push(this.removedStudent);
      this.presentStudents++ ;
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
    async uploadAttendance () {
      this.isLoading = true;
      const course_code = this.selectedCourseCode || this.courses[0].course_code;
      const type = this.selectedType || this.courses[0].type;
      let absent_ids = this.absentStudents.map(s => {
        return s.registration_no;
      });
      let co_id = this.courses.map(c => {
        if(c.course_code == course_code && c.type == type)
          return c.co_id;
      });
      co_id = co_id[0];
      const registration_nos = this.recognizedStudents;

      await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/student/markattendance/",{
      co_id,
      type,
      registration_nos,
      absent_ids
      })
      .then(result => {
        this.snackbar = true;
        if(result.data.message==='success'){
          this.snackbarText = 'Attendance Marked Successfully!';
          this.absentStudents = [];
          this.e1 = 1;
        }
        else{
          this.snackbarText = 'There was an error Marking Attendance!';
        }
        this.isLoading = false;
      })
      .catch(err => {
        console.log(err);
        this.snackbarText = 'Attendance Marking Failed!';
        this.isLoading = false;
      })
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
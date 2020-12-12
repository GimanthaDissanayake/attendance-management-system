<template>
    <v-container>
        <v-row>
            <p class='text-h5'>Send Alert</p> 
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="font-weight-medium"> 
                        <v-row>
                            <v-col cols="14" sm="7" md="7">
                                <v-row>
                                    <v-col>
                                        <p>Student Registration Number :</p>
                                    </v-col>
                                    <v-col>
                                        <v-chip>{{student.registration_no}}</v-chip>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <p>Student Name :</p>
                                    </v-col>
                                    <v-col>
                                        <v-chip>{{student.name}}</v-chip>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <p>Level :</p>
                                    </v-col>
                                    <v-col>
                                        <v-chip>{{course.level}}</v-chip>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <p>Mentor Name :</p>
                                    </v-col>
                                    <v-col>
                                        <v-chip>{{student.mentor_name}}</v-chip>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col>
                                <p>Select Receiver:</p>
                                <v-radio-group v-model="receiver">
                                    <v-radio label="Student" value="student" >
                                    </v-radio>
                                    <v-radio label="Mentor" value="mentor">
                                    </v-radio>
                                </v-radio-group> 
                            </v-col>
                        </v-row>
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-container>
                                    <v-textarea outlined clearable label="Message" v-model="message"></v-textarea>
                                </v-container>                    
                            </v-row>
                            <v-row>
                                <v-spacer></v-spacer>
                                <v-col cols="4" sm="2" md="2">
                                    <v-container>
                                        <v-btn @click="sendbtn" block large elevation="4">Send</v-btn>
                                    </v-container>          
                                </v-col>                         
                            </v-row>
                        </v-card-text>
                        
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
                </v-card>
            </v-col>
        </v-row>
        
        
    </v-container>
</template>

<script>
import axios from 'axios';
import { mapGetters} from "vuex";
export default {
    data () {
        return {  
            student: [],
            course:[],
            receiver: 'student',
            message:'',
            id:'',
            snackbar:'',
            snackbarText:'',
            user:[],
        }
    },
    methods: {
        ...mapGetters(["getToken"]),
        ...mapGetters(["getStudent"]),
        ...mapGetters(["getCourse"]),
        ...mapGetters(["getUser"]),
        async setData() {
            const token = this.getToken();
            this.student = this.getStudent();
            this.course = this.getCourse();
            this.user = this.getUser();
            //console.log(this.user.username)
            
        },
         sendbtn(){
            if(this.message == ''){
                alert("Message cannot be empty !!!");
            }else{
                if(this.receiver === 'mentor')
            {
                this.id = this.student.mentor_id;
            }    
            else if(this.receiver === 'student'){
                this.id = this.student.registration_no;
            }

            const message = this.message;
            const receiver = this.receiver; 
            const userId = this.id;
            const username = this.user.username;
            axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/alert/send_alert/",{
                message,
                userId,
                receiver,
                username
            })
            .then(result => {
               
                this.snackbar = true;
                if(result.data.message==='success'){
                    this.snackbarText = 'Alert sent Successfully!';
                    
                }
                else{
                   
                    this.snackbarText = 'There was an error send alert!';
                }
                setTimeout( () => this.$router.push({ path: '/viewRegisteredStudents'}), 2000);
            })
            .catch(err => {
                this.snackbarText = 'Alert sending Failed!';
                console.log(err);
            })
            }
        }    
    },
    async mounted(){
      try {
        await this.setData();
      } catch(err) {
        console.log(err.toString());
      }
    }
}

</script>
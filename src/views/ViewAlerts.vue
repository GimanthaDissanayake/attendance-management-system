<template>
  <v-container>
    <v-row>
      <p class='text-h5'>Alerts</p>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-subheader v-if="alertNew.length > 0" >New Messages</v-subheader>
          <v-expansion-panels>
            <v-expansion-panel
              v-for="alert in alertNew"
              :key="alert.lecturer_id"
               @click="panelClick(alert)"
              
              >
                <v-expansion-panel-header color="#F8F9F9">
                  <v-card class="d-flex mb-6" flat style="background-color:#F8F9F9">
                    <v-card style="background-color:#F8F9F9" flat><strong>{{alert.lecturer_name}}</strong></v-card>
                    <v-card style="background-color:#F8F9F9" flat class="ml-auto"><span class="font-weight-light">{{ alert.date }}</span></v-card>
                  </v-card>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  {{alert.message}}
                </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-subheader v-if="alertOld.length > 0">Older Messages</v-subheader>
          <v-expansion-panels>
            <v-expansion-panel
              v-for="alert in alertOld"
              :key="alert.lecturer_id"
             
              >
                <v-expansion-panel-header>
                  <v-card class="d-flex mb-6" flat>
                    <v-card flat><strong>{{alert.lecturer_name}}</strong></v-card>
                    <v-card flat class="ml-auto"><span class="font-weight-light">{{ alert.date }}</span></v-card>
                  </v-card>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  {{alert.message}}
                </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import { viewAlerts } from "../data/data";
  import axios from 'axios';
  import { mapGetters, mapMutations } from "vuex";

  export default {
    data () {
      return {
        drawer: null,
        alertOld:[],
        alertNew:[],
        timer:'',
      }
    },
    methods: {
      ...mapGetters(["getToken", "getUser"]),
      async setMessage1() {
        const token = this.getToken();
        const user = this.getUser();
        const receiver_id = user.username;
        return await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/alert/receiver_id_Old/",{
          receiver_id,
        })
        .then(async result => {
          const alertData = result.data.alert;
          const newAlert = alertData.map((alertDetail) => {
              alertDetail.date = alertDetail.date_time.split('T')[0];
              alertDetail.msg = alertDetail.message.substring(0,4);
              return alertDetail;
          })
          return await newAlert;                
        })
        .then(nd => {
          this.alertOld = nd; 
        })
      },
      async setMessage2(){
        const token = this.getToken();
        const user = this.getUser();
        const receiver_id = user.username;
        return await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/alert/receiver_id_New/",{
          receiver_id,
        })
        .then(async result => {
          const alertData = result.data.alert;
          const newAlert = alertData.map((alertDetail) => {
              alertDetail.date = alertDetail.date_time.split('T')[0];
              alertDetail.msg = alertDetail.message.substring(0,4);
              return alertDetail;
          })
          return await newAlert;                
        })
        .then(nd => {
          this.alertNew = nd; 
        })
        .catch(err => {
          console.log(err);
        });
      },
      async panelClick(item){
        const user = this.getUser();
        const username = user.username;
        const alert_id = item.alert_id;
        
        await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/alert/reset_read/",{
          username,alert_id
        })
         try {
        this.setMessage1();
        this.setMessage2();
        } catch(err) {
          console.log(err.toString());
        }
      },
    },
    async mounted(){
      try {
        this.setMessage1();
        this.setMessage2();
      } catch(err) {
        console.log(err.toString());
      }
    },
    created() {
      this.timer = setInterval(this.setMessage2, 5000)
    }, 
  }
</script>

<template>
  <div>
    <h1 class="subheading grey--text">Alerts</h1>
      <v-container
        class="py-8 px-6"
        fluid
      > 
        <v-expansion-panels>
          <v-expansion-panel
            v-for="alert in alert"
            :key="alert.lecturer_id"
          >
            <v-expansion-panel-header>
              <v-list two-line>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title> {{ alert.lecturer_name }}
                      <div  style="text-align:right">
                        {{ alert.date }} 
                      </div>
                    </v-list-item-title>
                    <!-- <v-list-item-subtitle >
                      <div>
                        {{ alert.msg }} 
                      </div>
                    </v-list-item-subtitle> -->
                    </v-list-item-content>
                  </v-list-item>
              </v-list>
            </v-expansion-panel-header>
          <v-expansion-panel-content>
            {{alert.message}}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
  import { viewAlerts } from "../data/data";
  import axios from 'axios';
  import { mapGetters, mapMutations } from "vuex";

  export default {
    data () {
      return {
        drawer: null,
        alert:[],
      }
    },
    methods: {
      ...mapGetters(["getToken", "getUser"]),
      async setMessage() {
        const token = this.getToken();
        const user = this.getUser();

          const receiver_id = user.username;
          return await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/alert/receiver_id/",{
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
                this.alert = nd; 
            })
            .catch(err => {
                console.log(err);
            });

          //console.log(result.data);
         
      },
    },
    async mounted(){
      try {
        this.setMessage();
        
      } catch(err) {
        console.log(err.toString());
      }
    }
  }
</script>
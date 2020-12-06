<template>
  <v-container>
    <p class='text-h5'>Set Duration for Mahapola Eligibility</p> <br>
    <v-card>
      <v-row>
        <v-spacer></v-spacer>
        <v-col xs="12" md="4">
          <span class="headline mb-2">Start Date</span>
          <v-row justify="center">
            <v-date-picker 
              v-model="start_date"
              elevation="10"
              :min="start_min"
              :max="start_max" ></v-date-picker>
          </v-row>
        </v-col>
        <v-spacer></v-spacer>
        <v-col xs="12" md="4">
          <span class="headline mb-2">End Date</span>
          <v-row justify="center">
            <v-date-picker 
              v-model="end_date"
              elevation="10"
              :min="end_min"
              :max="end_max"></v-date-picker>
          </v-row>
        </v-col> 
        <v-spacer></v-spacer>       
      </v-row>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn 
          class="primary" 
          v-on:click="setDate">
          SET DATES
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
    <!-- below is shown when data insert is successfull -->
    <div class="text-center" v-if="snackbar">
      <v-snackbar
        color="primary"
        v-model="snackbar"
        :timeout="timeout">
        {{ text }}
        <template v-slot:action="{ attrs }">
          <v-btn
            text
            v-bind="attrs"
            @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
  </div>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  data () {
    return {
      start_date: new Date().toISOString().substr(0, 10),
      end_date: new Date().toISOString().substr(0, 10),
      start_min: "",
      start_max: "",
      end_min: "",
      end_max: "",
      snackbar: false,
      text: '',
      timeout: 2000,
    }
  },
  methods: {
    formatDate(date) {
      var [month, date, year] = date.toLocaleDateString().split('/')
      if(date<10)
        date = '0' + date;
      return `${year}-${month}-${date}`;
    },
    async setDate() {
      let start_date = this.start_date;
      let end_date = this.end_date;
      await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/admin/mahapola/",{
        start_date,
        end_date
      }).then(result => {
        if(result.status==200) {
          this.text='Mahapola Duration Successfully Set !';
          this.snackbar = true;
        }
      }).catch(err => {
        console.log(err);
        this.text='Error Setting Dates !';
        this.snackbar = true;
      });
    }
  },
  created() {
    this.start_min = this.formatDate(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1));
    this.start_max = this.formatDate(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0));
    this.end_min = this.formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1));    
    this.end_max = this.formatDate(new Date(new Date().getFullYear(), new Date().getMonth() + 2, 0));
  }
}
</script>
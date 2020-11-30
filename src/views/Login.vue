<template>
  <v-container fluid fill-height class="bg">
    <v-row align="center" justify="center">
        <v-col cols="12" sm="4" md="4">
            <v-card :loading="loading" elevation="24" outlined>
                <v-img contain max-height="175" src="../assets/logo.png"></v-img>
                <p class="text-h6 text-center">Attendance Management System</p>
                <v-card-title>Sign In</v-card-title>
                <v-card-text>
                    <v-alert v-if="error" type="error">
                        {{ error }}
                    </v-alert>
                    <v-form>
                        <v-text-field label="Username" autofocus @focus="error = null" prepend-icon="mdi-account" type="text" v-model="username"/>
                        <v-text-field label="Password" @focus="error = null" prepend-icon="mdi-lock" type="password" v-model="password"/>
                    </v-form>
                </v-card-text>
                 <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn block class="primary" v-on:click="login">
                        Sign in
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import { mapMutations } from "vuex";
export default {
    data() {
        return {  
        loading: false, 
        error: false,
        username: '',
        password: '',   
        }
    },
    methods: { 
        ...mapMutations(["setToken", "setUser", "setMahapola"]),       
        async login() {
            this.loading = true;

            const username = this.username;
            const password = this.password;

            try {
                await axios.post(process.env.VUE_APP_BACKEND_SERVER + "/api/auth/login", {
                    username,
                    password,
                }).then(response => {
                    if(response.status === 200){
                        
                        if(response.data.mahapola===0){
                            this.setMahapola('no');
                        } else {
                            this.setMahapola('yes');
                        }
                            
                        this.setToken(response.data.token);
                        this.setUser({
                            name: response.data.name,
                            username: response.data.username,
                            is_logged: true,
                            role: response.data.role
                        });
                        this.loading = false;
                    } 
                })
                .catch(err => {
                    if(err.response){
                        console.log(err.response);
                        this.error = err.response.data.message;
                        this.loading = false;
                    } else if(err.request){
                        this.error = "Check your connection!";
                        console.log('No Response from server: ', err.request);
                        this.loading = false;
                    } else    
                        console.log(err);
                });
            } catch(err) {
                console.log(err);
            }
        },
    }
}
</script>

<style>
.bg {
    background-image: url('../assets/background.png');
    background-size: cover;
}
</style>
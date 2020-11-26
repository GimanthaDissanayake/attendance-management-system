<template>
  <v-container fluid fill-height class="bg">
    <v-row align="center" justify="center">
        <v-col cols="12" sm="4" md="4">
            <v-card elevation="24" outlined>
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
                    <v-btn block class="primary">
                        Sign in
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {

}
</script>

<style>
.bg {
    background-image: url('../assets/background.png');
    background-size: cover;
}
</style>
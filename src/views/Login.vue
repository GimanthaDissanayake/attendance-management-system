<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
        <v-col cols="12" sm="4" md="4">
            <v-card class="elevation-2" max-width="50vh">
                <v-toolbar flat>
                    <v-toolbar-title>Sign in</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-icon>mdi-account</v-icon>
                </v-toolbar>
                <v-card-text>
                    <v-alert v-if="error" type="error">
                        {{ error }}
                    </v-alert>
                    <v-from>
                        <v-text-field
                            label="Username"
                            autofocus
                            @focus="error = null"
                            prepend-icon="mdi-account"
                            type="text"
                            v-model="username"
                        />
                        <v-text-field
                            label="Password"
                            @focus="error = null"
                            prepend-icon="mdi-lock"
                            type="password"
                            v-model="password"
                        />
                    </v-from>
                </v-card-text>
                 <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn block >
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

</style>
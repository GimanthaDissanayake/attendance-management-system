<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step
        :complete="e1 > 1"
        step="1"
      >
        Enter Reg. No
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step
        :complete="e1 > 2"
        step="2"
      >
        Upload/Change image
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3">
        Confirmation
      </v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-container>
          <v-row>
            <v-col xs="12" md="8">
              <v-text-field
                v-model="search"
                label="Search"
                placeholder="Enter Registration Number"
                clearable
                single-line
              >
              </v-text-field>
            </v-col>
            <v-col xs="12" md="4">
              <v-btn
                 @click="e1 = 2"
              >
                Enter
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-stepper-content>
      <v-stepper-content step="2">
          <v-container>
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
                <v-col cols="6" sm="6" md="6">
                    <v-row>
                        <v-col cols="7" sm="5" md="5">
                            Level :
                        </v-col>
                        <v-col>
                            <v-chip>{{student.level}}</v-chip>
                        </v-col>
                    </v-row>                    
                </v-col>
                <v-col cols="6" sm="6" md="6">
                    <v-row>
                        <v-col cols="7" sm="5" md="5">
                            Image :
                        </v-col>
                        <v-col>
                            <v-chip>{{student.image_status}}</v-chip>
                        </v-col>
                    </v-row>                    
                </v-col>
            </v-row>
            <v-file-input
              v-if="student.image_status === 'Not registered'"
              :rules="rules"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick the image"
              prepend-icon="mdi-camera"
              label="Upload image"
            >
            </v-file-input>
            <v-file-input
              v-if="student.image_status === 'Registered'"
              :rules="rules"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick the image"
              prepend-icon="mdi-camera"
              label="Change image"
            >
            </v-file-input>
            <v-btn 
              @click="e1 = 3"
              v-if="student.image_status ==='Registered'"
            > 
              Change image
            </v-btn>
            <v-btn
              @click="e1 = 3"
              v-if="student.image_status ==='Not registered'"
            > 
              Upload image
            </v-btn>
          </v-container>
      </v-stepper-content>
      <v-stepper-content step="3">
        Confirmation
        <v-btn
          color="primary"
          @click="e1 = 1"
        >
          Continue
        </v-btn>
        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { registerUsers } from "../data/data";
  export default {
    data () {
      return {
        student:registerUsers.student,
        e1: 1,
      }
    },
  }
</script>
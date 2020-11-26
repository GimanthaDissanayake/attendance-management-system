<template>
  <div>
    <p class='text-h5'>Mark attendance</p> 
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step
          :complete="e1 > 1"
          step="1"
        >
          Select the course
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
          :complete="e1 > 2"
          step="2"
        >
          Mark attendance
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">
          Show absent students
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="4">
          Confirmation
        </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">    
          <!--  stepper 1 contents  -->
          <v-container>
            <v-layout row >
              <v-flex md9 xs12>
                <v-layout row>
                  <v-flex md3 xs12>
                    <v-layout>
                      <v-flex md3 mx3>
                      </v-flex>
                      <v-flex md9 mx9>
                        Course details :
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex md3 xs12>
                    <v-select
                      :items="items"
                      label="Solo field"
                      solo
                    >
                    </v-select>
                  </v-flex>
                  <v-flex md3 xs12>
                    <v-select
                      :items="items"
                      label="Solo field"
                      solo
                    >
                    </v-select>
                  </v-flex>
                  <v-flex md3 xs12>
                    <v-select
                      :items="items"
                      label="Solo field"
                      solo
                    >
                    </v-select>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex md9 xs12>
                <v-layout row wrap>
                  <v-flex md3 xs12>
                    <v-layout>
                      <v-flex md3 mx3>
                      </v-flex>
                      <v-flex md9 mx9>
                        Time details :
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex md3 xs12>
                    <v-select
                      :items="items"
                      label="Solo field"
                      solo
                     >
                     </v-select>
                  </v-flex>
                  <v-flex md3 xs12>
                    <v-select
                      :items="items"
                      label="Solo field"
                      solo
                    >
                    </v-select>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex md3 xs12>
                <v-btn
                  color="primary"
                  @click="e1 = 2"
                >
                  Mark attendance
                </v-btn>
              </v-flex>
            </v-layout>  
          </v-container>
          <br><br>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-layout row wrap> 
            <v-flex md9 xs12>
              <v-img
                  lazy-src="https://picsum.photos/id/11/10/6"
                  max-height="400"
                  max-width="900"
                  src="https://picsum.photos/id/11/500/300"
              >
              </v-img>
            </v-flex>
            <v-flex md3 xs12>
              <v-btn
                text
              >
                Retake
              </v-btn>
              <v-btn
                @click="e1 = 3"
                color="primary"
              >
                Confirm
              </v-btn>
            </v-flex>
          </v-layout>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-container>
            <v-layout row wrap>
              <v-flex md3 xs12>
                Number of present students : 44 
              </v-flex>
              <v-flex md6 xs12>
              </v-flex>
              <v-flex md3 xs12>
                Attendance persentage : 85%
              </v-flex> 
            </v-layout>
            <br>
            <v-data-table
              :headers="headers"
              :items="data"
              class="elevation-1"
            >
              <template v-slot:item.remove="{ item }">
                <v-btn
                  :color="red"
                >
                  {{ item.remove }}
                </v-btn>
              </template>
            </v-data-table>
            <br>
              Add unregistered students
            <v-layout row wrap>
              <v-flex md4 xs6>
                <v-text-field 
                  label="Registration Number"
                >
                </v-text-field>
              </v-flex>
              <v-flex md4 xs6>
                <v-btn>
                  Add
                </v-btn>
              </v-flex>
              <v-flex md4 xs6>
                <v-btn
                  color="primary"
                  @click="e1 = 1"
                >
                  Mark attendance
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
          <br>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import { markAttendance } from "../data/data";
  export default {
    data () {
      return {
        headers: markAttendance.headers,
        data: markAttendance.data,
        items: markAttendance.items,
       e1: 1,
      }
    },
   
    
  }
</script>
<template>
    <v-container>
        <p class='text-h5'>Attendance Sheet</p> 

        <v-card>
            <v-container>
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
                                <v-chip>{{student.level}}</v-chip>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <p>Mentor Name :</p>
                            </v-col>
                            <v-col>
                                <v-chip>{{student.mentor}}</v-chip>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col>
                        <p>Select Receiver:</p>
                        <v-radio-group v-model="receiver">
                            <v-radio label="Student" value="student">
                            </v-radio>
                            <v-radio label="Mentor" value="mentor">
                            </v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>
                <v-row>
                    <v-container>
                        <v-textarea outlined clearable label="Message"></v-textarea>
                    </v-container>                    
                </v-row>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-col cols="4" sm="2" md="2">
                        <v-container>
                            <v-btn block large elevation="4">Send</v-btn>
                        </v-container>          
                    </v-col>                         
                </v-row>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            receiver: null,
            student:{
                name: 'Kamal Perera',
                registration_no: 'SC/2021/12291',
                level: 'Level 3',
                mentor: 'Kasun Sirisena'
            },
        }
    }
}
</script>

<style>

</style>
<template>
  <v-container>
    <p class='text-h5'>Set Minimum Required Attendance Percentage</p> 
     <v-row>
      <v-col xs="12" md="4">
        <v-text-field
          v-model="search"
          label="Search"
          placeholder="Enter MRAP"
          clearable
          single-line
        >
        </v-text-field>
      </v-col>
      <v-col xs="12" md="4">
        <v-btn
        >
          Set
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
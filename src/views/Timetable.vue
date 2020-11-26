<template>
  <div  class="pa-4">
    <v-layout>
      <h3 class="subheading grey--text">View Timetable</h3>
      <v-spacer></v-spacer>
        <p>Week No : 12 </p>
    </v-layout>      
    <v-data-table
      :headers="headers"
      :items="item"
      class="elevation-1"
      hide-default-footer
    >
      <template v-slot:item.Monday="{ item }">
        <v-btn
          block
          depressed
          large
          :color="getColor(item.Monday)"
          dark
        >
          {{ item.Monday }}
        </v-btn>
      </template>
      <template v-slot:item.Tuesday="{ item }">
        <v-btn
          block
          depressed
          large
          :color="getColor(item.Tuesday)"
          dark
        >
          {{ item.Tuesday }}
        </v-btn>
      </template>
      <template v-slot:item.Wednesday="{ item }">
        <v-btn
          block
          depressed
          large
          :color="getColor(item.Wednesday)"
          dark
        >
          {{ item.Wednesday }}
        </v-btn>
      </template>
      <template v-slot:item.Thursday="{ item }">
        <v-btn
          block
          depressed
          large
          :color="getColor(item.Thursday)"
          dark
        >
          {{ item.Thursday }}
        </v-btn>
      </template>
      <template v-slot:item.Friday="{ item }">
        <v-btn
          block
          depressed
          large
          :color="getColor(item.Friday)"
          dark
        >
          {{ item.Friday }}
        </v-btn>
      </template>
    </v-data-table>    
  </div>
</template>

<script>
  import { timetable } from "../data/data";
  export default {
    data () {
      return {
        headers : timetable.headers,
        item: timetable.item,
      }
    },
    
    methods: {
      getColor (Monday) {
        if (Monday == "CSC1133") return 'red'
        else if(Monday == "CSC1122") return 'blue'
        else if(Monday == "CSC1144") return 'yellow'
        else return 'white'
      },
    },
  }
</script>

<style scoped>
  .v-data-table
    /deep/
      tbody
        /deep/
          tr:hover:not(.v-data-table__expanded__content) {
            background:white !important;
          }
</style>
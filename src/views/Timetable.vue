<template>
    <div  class="pa-4">
        <v-layout>
        <h3 class="subheading grey--text">View Timetable</h3>
          <v-spacer></v-spacer>
        <p>Week No : 12 </p>
        </v-layout>

              <template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th>Time</th>
          <th>Monday</th>
           <th>Tuesday</th>
           <th>Wednesday</th>
           <th>Thursday</th>
           <th>Friday</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in tabledata"
          :key="item.name"
        >
          <td>{{ item.Time }}</td>
          <td>{{ item.Monday }}</td>
          <td>{{ item.Tuesday }}</td>
          <td>{{ item.Wednesday }}</td>
          <td>{{ item.Thursday }}</td>
          <td>{{ item.Friday }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
 </template>
        
</div>
</template>

<script>
  export default {
    data () {
      return {
      
        tabledata: [
          {
             Time: "8 - 9",
            Monday : 'CSC1142',
            Tuesday: "",
            Wednesday: "MAT2233",
            Thursday: "",
            Friday: "PHY3145"
          },
          {
             Time: "9 - 10",
            Monday : '',
            Tuesday: "MAT1122",
            Wednesday: "MAT2233",
            Thursday: "",
            Friday: "PHY3145"
          },
          {
            Time: "10 - 11",
            Monday : '',
            Tuesday: "MAT1122",
            Wednesday: "MAT2233",
            Thursday: "CSC3244",
            Friday: "PHY3145"
          },
        ],

      }
    },
  }
</script>
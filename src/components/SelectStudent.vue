<template>
  <div>
      <v-container>
            <p>Search</p>
      </v-container>
      <v-card>
          <v-list>
              <!-- <v-subheader>2017</v-subheader> -->
              <v-list-item-group
                v-model="selectedStudent"
              >
                <v-list-item
                    v-for="(student,i) in studentList"
                    :key="i"
                >
                    <v-list-item-content>
                        <v-list-item-title v-text="student.id"></v-list-item-title>
                        <p>{{ student.name }}</p>
                    </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
          </v-list>
      </v-card>
  </div>
</template>

<script>
export default {
    data() {
        return {
            selectedStudent: 1,
            studentList: [
                {id:'2017/1', name:'kamal', year:'2017'},
                {id:'2017/2', name:'nimal', year:'2017'},
                {id:'2018/34', name:'amal', year:'2018'},
            ]
        }        
    },
    methods: {

    }
}
</script>

<style>

</style>
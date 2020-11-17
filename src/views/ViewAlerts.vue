
<template>
  <div>
    <h1 class="subheading grey--text">Alerts</h1>
      <v-container
        class="py-8 px-6"
        fluid
      >
        <v-row>
          <v-col
            v-for="card in cards"
            :key="card.from"
            cols="12"
          >
            <v-card>
              <v-list two-line>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title> {{ card.from }}
                      <div  style="text-align:right">
                        {{ card.date }} 
                      </div>
                    </v-list-item-title>
                    <v-list-item-subtitle >
                      <div>
                        {{ card.msg }} 
                      </div>
                    </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </div>
</template>

<script>
  export default {
    data: () => ({
      cards: [
            {date:'April 11', from: 'Heshan Jayasinghe' , msg: 'this is the first msg'},  
            {date:'March 05', from: 'Gimantha Dissanayake' , msg: 'this is the second msg'}
        ],
      drawer: null,
    }),
  }
</script>
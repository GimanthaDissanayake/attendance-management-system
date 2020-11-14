import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'md',    
  },
  theme: {
    themes:{
      light:{
        primary: '#6200EE',
        secondary: '#03DAC5',
        accent: colors.shades.black,
        error: '#B00020',
      },
      dark: {
        primary: colors.blue.lighten3,
      },
    },
  },
});

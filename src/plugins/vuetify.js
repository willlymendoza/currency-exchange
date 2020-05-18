import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#ee44aa',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        raisin_c: '#272932',
        crayola_c: '#F05D5E',
        skobeloff_c: '#0F7173',
        indigodye_c: '#0D3B66',
        aliceblue_c: '#E7ECEF'
      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
})

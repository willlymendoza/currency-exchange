<template>
  <v-content>
    <v-container fluid class="fill-height skobeloff_c">
      <v-row align="center" justify="center" class="flex-wrap">
        <!-- INPUT FORM -->
        <v-col cols="12" sm="6" md="4">
          <v-card class="elevation-2 aliceblue_c">
            <v-toolbar color="indigodye_c" flat dark>
              <v-toolbar-title>Select currencies to convert</v-toolbar-title>
            </v-toolbar>
            <v-card-text class="indigodye_c--text">
              <v-row dense="">
                <v-col cols="12">
                  <v-autocomplete
                    :items="symbols"
                    v-model="currencyFrom"
                    label="From"
                    item-text="value"
                    item-value="name"
                    color="indigodye_c"
                    item-color="indigodye_c"
                    @keyup.enter="convert(currencyFrom, currencyTo)"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <h2>To:</h2>
                </v-col>
                <v-col cols="12">
                  <v-autocomplete
                    :items="symbols"
                    v-model="currencyTo"
                    item-text="value"
                    item-value="name"
                    color="indigodye_c"
                    item-color="indigodye_c"
                    @keyup.enter="convert(currencyFrom, currencyTo)"
                  ></v-autocomplete>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="6">
                  <v-text-field
                    :label="currencyFrom + '(amount)'"
                    name="amount"
                    type="number"
                    v-model="amount"
                    color="indigodye_c"
                    @keyup.enter="convert(currencyFrom, currencyTo)"
                    >USD</v-text-field
                  >
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="indigodye_c"
                dark
                @click="convert(currencyFrom, currencyTo)"
                >Convert</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>

        <!-- RESULT -->
        <v-col cols="12" sm="6" md="4">
          <v-card class="elevation-2" min-height="330">
            <v-toolbar color="crayola_c" flat dark>
              <v-toolbar-title>Result</v-toolbar-title>
            </v-toolbar>
            <v-row v-if="!wait">
              <v-col cols="12" class="pb-0">
                <h1 class="text-center indigodye_c--text">
                  {{ currencyFrom }}
                </h1>
                <h3 class="text-center crayola_c--text">{{ amount }}</h3>
              </v-col>
              <v-col cols="12" class="pb-0">
                <h1 class="text-center indigodye_c--text">=</h1>
              </v-col>
              <v-col cols="12">
                <h1 class="text-center indigodye_c--text">
                  {{ currencyTo }}
                </h1>
                <h3 class="text-center crayola_c--text mx-5">{{ result }}</h3>
              </v-col>
            </v-row>

            <!-- LOADER -->
            <v-row
              v-else
              justify="center"
              align="center"
              style="height: 273px;"
            >
              <v-col cols="9" class="pa-0">
                <h3>Waiting for user input...</h3>
                <v-progress-linear
                  color="crayola_c accent-4"
                  indeterminate
                  rounded
                  height="5"
                ></v-progress-linear>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import currencyService from '@/services/currency.js'
import { db } from '@/main.js'
export default {
  data() {
    return {
      currencies: [],
      symbols: [],
      currencyFrom: '',
      currencyTo: '',
      amount: '',
      result: '',
      wait: true
    }
  },
  watch: {
    amount: function() {
      this.changeWait()
    },
    currencyFrom: function() {
      this.changeWait()
    },
    currencyTo: function() {
      this.changeWait()
    }
  },
  methods: {
    createArraySymbols(obj, arrayTo) {
      Object.entries(obj).forEach(([key, value]) => {
        if (arrayTo === 'symbols') {
          this[arrayTo].push({ name: key, value: key })
        } else {
          this[arrayTo].push({ name: key, value })
          db.collection('actualCurrencies').add({
            name: 'USD',
            value: 1.125
          })
        }
      })
    },
    getValues() {
      currencyService
        .getList()
        .then(response => {
          this.currencies = response.data.currencies
          this.symbols = response.data.symbols
        })
        .catch(error => {
          console.log(error.message)
        })
    },
    convert(from, to) {
      if (this.currencyFrom && this.currencyTo && this.amount) {
        const valueFrom = this.currencies.find(item => item.name === from)
        const valueTo = this.currencies.find(item => item.name === to)
        this.result = (
          (parseFloat(valueTo.value) / parseFloat(valueFrom.value)) *
          this.amount
        ).toFixed(4)
        this.wait = false
      }
    },
    changeWait() {
      this.wait = true
    }
  },
  created() {
    this.getValues()
  }
}
</script>

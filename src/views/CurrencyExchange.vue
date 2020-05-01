<template>
  <v-content>
    <v-container fluid class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="4" md="4">
          <v-card class="elevation-2">
            <v-toolbar color="info" flat dark>
              <v-toolbar-title>Select currencies to convert</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-row dense="">
                <v-col cols="12">
                  <v-autocomplete
                    :items="symbols"
                    v-model="currencyFrom"
                    label="From"
                    item-text="value"
                    item-value="name"
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
                    >USD</v-text-field
                  >
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="info"
                dark
                @click="convert(currencyFrom, currencyTo)"
                >Convert</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" md="4">
          <v-card class="elevation-2" height="300">
            <v-toolbar color="success" flat dark>
              <v-toolbar-title>Result</v-toolbar-title>
            </v-toolbar>
            <v-content>
              <v-row v-if="currencyFrom && currencyTo">
                <v-col>
                  <h1 class="text-center">{{ currencyFrom }}</h1>
                  <h3 class="text-center">{{ amount }}</h3>
                </v-col>
                <v-col>
                  <h1 class="text-center">=</h1>
                </v-col>
                <v-col>
                  <h1 class="text-center">{{ currencyTo }}</h1>
                  <h3 class="text-center">{{ result }}</h3>
                </v-col>
              </v-row>
            </v-content>
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
      result: ''
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
      }
    }
  },
  created() {
    this.getValues()
  }
}
</script>

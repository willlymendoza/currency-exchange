# Currency-Exchange App

Made with:

```
HTML
CSS
JAVASCRIPT
VUE.JS v2.6.11
VUETIFY v2.2.11
```

This application allows you to know the exchange rate of up to 170 international currencies.

The https://fixer.io API was used as a source of information, which is controlled through a back-end made in Laravel which is located in this repository https://github.com/willlymendoza/larapi.

Please follow the instructions in the aforementioned backend repository before continuing.

In order to use this application you can follow the detailed instructions below:

## Front-end Setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Add an end-point

Once you have finished the previous steps, you need to add to the file found in services / currency.js the address that you have configured according to the installation of the aforementioned back-end,this file should look like this:

```
const apiClient = axios.create({
  baseURL: `https://<your end-point>`,
  withCredentials: false, //this is the default,
  headers: {
    Accept: 'appication/json',
    'Content-Type': 'application/json'
  }
})
```

## You're done

Start using the app and enjoy it.

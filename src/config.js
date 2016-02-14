require('babel/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Oh My Github',
    description: 'Create your Github Profile in 1 minute',
    head: {
      titleTemplate: 'Oh My Github: %s',
      meta: [
        {name: 'description', content: 'Create your Github Profile in 1 minute'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Oh My Github'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'Oh My Github'},
        {property: 'og:description', content: 'Create your Github Profile in 1 minute'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@oh-my-github'},
        {property: 'og:creator', content: '@oh-my-github'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);

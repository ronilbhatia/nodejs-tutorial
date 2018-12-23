const yargs = require('yargs');
const axios = require('axios');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

let encodedAddress = encodeURIComponent(argv.address);
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyADMBnEo6TWAcDahZ4gIwg0XoIddpiW5N8`;

axios.get(geocodeUrl).then(response => {
  if (response.data.status === "ZERO_RESULTS") {
    throw new Error('Unable to find that address');
  }
  let latitude = response.data.results[0].geometry.location.lat;
  let longitude = response.data.results[0].geometry.location.lng;
  let weatherUrl = `https://api.darksky.net/forecast/8ff416418493e09e95ab8f329a259284/${latitude},${longitude}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then(response => {
  let temperature = response.data.currently.temperature;
  let apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);
}).catch(error => {
  if (error.code === "ECONNREFUSED") {
    console.log("Unable to connect to API servers");
  } else {
    console.log(error.message);
  }
});

const request = require('request');

const getWeather = (latitude, longitude, cb) => {
  request({
    url: `https://api.darksky.net/forecast/8ff416418493e09e95ab8f329a259284/${latitude},${longitude}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      cb("Unable to connect to DarkSky servers");
    } else if (response.statusCode !== 200) {
      cb("Unable to fetch weather");
    } else {
      cb(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }
  });
};

module.exports.getWeather = getWeather;

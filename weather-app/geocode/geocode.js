const request = require('request');

const geocodeAddress = (address, cb) => {
  const encodedAddress = encodeURIComponent(address);
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyADMBnEo6TWAcDahZ4gIwg0XoIddpiW5N8`,
    json: true
  }, (error, response, body) => {
    if (error) {
      cb("Unable to connect to Google servers");
    } else if (body.status === 'ZERO_RESULTS') {
      cb("Unable to find that address");
    } else {
      cb(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  });
};

module.exports = {
  geocodeAddress
};

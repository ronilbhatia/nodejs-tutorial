const request = require('request');

let geocodeAddress = address => {
  return new Promise((resolve, reject) => {
    const encodedAddress = encodeURIComponent(address);
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyADMBnEo6TWAcDahZ4gIwg0XoIddpiW5N8`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to connect to Google servers');
      } else if (body.status == 'ZERO_RESULTS') {
        reject('Unable to find that address');
      } else {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      }
    });
  });
};

geocodeAddress('000000').then(location => {
  console.log(JSON.stringify(location, undefined, 2));
}, errorMessage => {
  console.log(errorMessage);
});

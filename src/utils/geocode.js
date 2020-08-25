const request = require('request');

const geocode = (address, callback) => {
  
  const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYWRhMjMiLCJhIjoiY2s4Nmc2bmt0MDV0NzNtbGprajN3MHpkNiJ9.ituuNXxYwyW8XjIkh-qFAA&limit=1";

  request({url, json: true}, (error, {body} = {}) => {
    if (error) {
      callback('Unable to connect to mapbox api', undefined);
    } else if (!body.features || body.features.length === 0) {
      callback('Unable to find location', undefined)
    } else {
      const {center, place_name} = body.features[0];
      callback(undefined, {
        lat: center[1],
        long: center[0],
        location: place_name
      });
    }
  })
}



module.exports = geocode;
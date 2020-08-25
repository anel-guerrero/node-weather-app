const request = require('request');

const forecast = (lat, lon, callback) => {

  const url = "http://api.weatherstack.com/current?access_key=0f1ab394f423796375d73c4803cb6195&query=" + lat + "," + lon + "&units=f";


  request({url, json: true}, (error, {body} = {}) => {
    if (error) {
      callback('Unable to connect to darksky api', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      let {temperature, precip, weather_descriptions, feelslike} = body.current;

      callback(undefined,weather_descriptions + ". It is currently " + temperature + " degrees out. It feels like " + feelslike+ ". There is " + precip + "% chance of rain.")
    }
  })
}

module.exports = forecast;
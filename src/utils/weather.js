
const request = require("request");

const weather = (latitude, longitude, callback) => {
    const weatherurl = `http://api.weatherstack.com/current?access_key=3fd0c375a46da248e6b98f9207c97eb4&query=${latitude},${longitude}`
   
    request({ url: weatherurl, json: true }, (error, response) => {
      if (error) {
          callback("error",undefined);
      } else if ( response.body.error) {
          callback(response.body.error.code, undefined);
      } else {
        
        var currentWeather = response.body.current.temperature;
        var percentageRain = response.body.current.precip;
        callback(undefined,{
          currentWeather : currentWeather,
          percentageRain :  percentageRain
        })
      }
    });
  };

  module.exports = weather
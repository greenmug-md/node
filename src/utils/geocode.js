const request = require("request");

const geocode = (address, callback) => {
    var add = encodeURIComponent(address)
   const gecodingurl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${add}.json?access_token=pk.eyJ1IjoiZ3JlZW5tdWciLCJhIjoiY2tneDVsbGpvMDR2ODJ5cGNnamk3a2xrYyJ9.ZeeTKqUOyXZOsGwopJXRQw`;
   request({ url: gecodingurl, json: true }, (error, response) => {
     if (error) {
         callback("Unable to connect",undefined);
     } else if (response.body.error || (response.body.features && response.body.features.length === 0)) {
         callback("Unable "+response.body.error.code, undefined);
     } else {
       var features = response.body.features[0];
       var lat = features.center[1];
       var long = features.center[0];
       callback(undefined,{
           latitude :  response.body.features[0].center[1],
           longitude : response.body.features[0].center[0],
           location : response.body.features[0].place_name 
     })
 }
   });
 }

 module.exports = geocode



var Twitter = require('twitter');
var confs = require('./confs.js');
var tw_creds = confs.CREDS  

console.log(tw_creds);

var client = new Twitter(tw_creds);

//get trends
client.get('trends/available.json', function(error, data) {
  if(error) throw error;
  console.log(data);  // Trends 
});

/**
var stream = client.stream('statuses/filter', {track: 'amor'});

stream.on('data', function(event) {
  console.log(event && event.text);
});
 
stream.on('error', function(error) {
  throw error;
});
**/


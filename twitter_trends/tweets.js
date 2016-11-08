
var Twitter = require('twitter');
var Data = require('./dbis.js');
var Worker = require('./workis.js');
var confs = require('./confs.js');

var tw_creds = confs.CREDS;
var places=confs.GEOTS;

var woeids = [];

var client = new Twitter(tw_creds);

//get geo targets woeid for trends

/*
client.get('trends/available.json', function(error, data) {

    if(error) throw error;

    data.filter(function(element){
        return places.indexOf(element.name)>=0;
    }).map(function(element){
        woeids.push(element.woeid);
    });

    console.log(woeids.join());
});
**/

//get trends
var woeids=['23424768'];

var fetch_trends=function(woeids) {

    var fetch_trend=function(woeid){
        client.get('trends/place.json', {id: woeid},
                   function(error, data, response) {
                     if (error) throw error;
                      //save terms
                      Data.insert_trends(data[0].trends, woeid);
                      }
                  );
    }

    woeids.map(fetch_trend(woeid));
}

var run_stream = function(terms) {

    //start stream and save data
    var stream_terms=escape(terms.join());
    console.log('Stream: '+stream_terms)

    var stream=client.stream('statuses/filter', {track: stream_terms});

    stream.on('data', function(tweet) {
      var response=Data.parseStreamTweet(tweet);
      response.insert();
    });

    stream.on('error', function(error) {
      throw error;
    });
}

//trends=fetch_trends(woeids)
//console.log(trends)
run_stream(['amor','paixao']);

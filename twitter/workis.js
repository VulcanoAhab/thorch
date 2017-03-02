
var Twitter = require('twitter');
var confs = require('./confs.js');

var tw_creds = confs.CREDS;
var places=confs.GEOTS;



var Result = {
    raw:[],
    terms:[],
    woeids:[],

    };

var worker = {


    //start stream
    run_stream:function(terms) {

        //start stream and save data
        var stream_terms=escape(this.terms.join());
        console.log('Stream: '+stream_terms)

        var stream=client.stream('statuses/filter', {track: stream_terms});

        stream.on('data', function(event) {
          console.log(event && event.text);
        });

        stream.on('error', function(error) {
          throw error;
        });
    },

    //trends=fetch_trends(woeids)
    //console.log(trends)
    //run_stream(terms)
    _test:function(){
        this.fetch_trends()
            }
}

worker._test()


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

    //build client
    client:new Twitter(tw_creds),

    //get geo targets woeid for trends
    fetch_woeids: new Promise(function(fullfill, reject) {

        client.get('trends/available.json', function(error, data) {
            
            if(error) throw error;
            
            data.filter(function(element){
                return places.indexOf(element.name)>=0;
            }).map(function(element){
                Result.woeids.push(element.woeid);
            });  
            
            console.log('[+] Mined woeids ['+Result.woeids.join()+'] from ['+places.map(function(e){return e.name}).join()+']');
        });}),
        
    //get trends
    fetch_trends:function(woeids) {
        
        if (woeids == undefined){
            woeids=['23424768'];
        }
        
        var client=this.client;
 
        for (n=0;n<woeids.length;++n){ 
            
            var woeid=woeids[n];
 
            client.get('trends/place.json', {id: woeid}, function(error, data, response) {
                
                    if (error) throw error;
                
                    //save terms
                    //dbis.insert_trends(data[0].trends, woeid)           
                    Result.raw.push(data[0].trends);
        })
        
        }
        
        console.log('[+] Fetching trends from: '+woeids.join())
        console.log(Result.raw)
    },
    
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

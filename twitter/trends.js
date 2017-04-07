
var Twitter = require('twitter');
var confs = require('./configs.js');
var Reponse=require('./response_trends.js')



function Trends () {

  this._default_woeids=[{'woeid':'23424768'}];

  this.client=new Twitter(confs.CREDS);

  this.fetch=function(){
    var that=this;
    this.client.get('trends/available.json', function(error, data) {
        if(error) throw error;
        var places=confs.GEOTS;
        var filtered_data=data.filter(function(element){
          return places.indexOf(element.name)>=0;})
        if (!filtered_data.length){
          filtered_data=this._default_woeids;
        }
        for (i=0;i<filtered_data.length;i++){
          var el=filtered_data[i];
          var query={id: el.woeid};
          that.client.get('trends/place.json', query,
                          function(error, data, response) {
                  if (error) throw error;
                  //build response
                  console.log(data[0].trends);
                })
        }
    })
  }
}


module.exports.Trends=Trends;

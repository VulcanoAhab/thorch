var exports = module.exports;

var trendis=require("./responses_base.js");
var trendParser=trendis.Trend;


var response=function(){

  this._data=[];

  this.parse=function(responseArray){
    for (k=0; k<responseArray.length; ++i){
      var raw_obj=responseArray[k];
      var date=raw_obj.created_at;
      var locations=raw_obj.locations;
      var trends=raw_obj.trends;
      for (var i=0; i<trends.length; ++i){
          var trend=trends[i];
          var finTrend=trendParser(trend, date, locations);
          this._data.push(finTrend);
      }
    }
  }

}


exports.response=response
exports._testObject=require("./trends_sample.json")

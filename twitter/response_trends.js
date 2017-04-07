var trendis=require("../torch/responses_base.js");

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
          var finTrend=trendis.process(trend, date, locations);
          console.log(finTrend);
      }
    }
  }

}


module.exports=response
module._testObject=require('trends_sample')

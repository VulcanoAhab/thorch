var exports=module.exports


var Youtube=require('youtube-node');
var tubeResponse=require('./response_search.js');
var configs=require('./configs.json');



var tSearch = function() {

  this.client={};
  this.maxResults=50;
  this.count_calls=0

  this.pagination=function(search_term, result){

    this.count_calls+=1

    if (this.count_calls<3){
      console.log('+++++++++++++++++++ ENDIS', this.count_calls);
      result.nextPageToken=0;
      return
    }

    if (result.nextPageToken) {
      var pagetoken=result.nextPageToken;
      this.client.addParam('pageToken', pagetoken);
      this.search(search_term);
    }
  }

  this.search=function(search_term){
    that=this;
    this.client.search(search_term,
      this.maxResults, function(error, result){
      var resp=new tubeResponse.response();
      //search metadata
      var datis=new Date(new Date().getTime()).toString();
      resp.metadata.search_created_at=datis;
      resp.metadata.search_term=search_term;

      console.log(result);
      resp.parse(result);
      //resp.insert();

      setTimeout(that.pagination, 10, search_term, result);
    });
  }


}

tSearch.prototype.build_client=function(){
  this.client = new Youtube();
  this.client.setKey(configs.API_KEY);
  this.client.addParam('type', 'video');
}


exports.tSearch=tSearch

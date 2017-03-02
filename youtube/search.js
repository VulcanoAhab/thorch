

var Youtube=require('youtube-node');
var tubeResponse=require('./response_search.js');
var configs=require('./configs.json');



var tSearch = function() {

  this.client={};
  this.maxResults=50;
  this.maxPages=1000;
  this.countPages=0;
  this._total=0;

  this.pagination=function(search_term, result){
    that=this;
    if (this.maxPages > 0){
      this.countPages+=1
      if (this.countPages>=this.maxPages){
        result.nextPageToken=0;
        return 'done'
      }
    }
    if (result.nextPageToken) {
      var pagetoken=result.nextPageToken;
      this.client.addParam('pageToken', pagetoken);
      setTimeout(this.search.bind(that),  1000, search_term, this);
      //this.search(search_term);
    }
  }

  this.search=function(search_term){
    that=this;
    this.client.search(search_term, this.maxResults, function(error, result) {
      var resp=new tubeResponse();
      //search metadata
      var datis=new Date(new Date().getTime()).toString();
      resp.metadata.search_created_at=datis;
      resp.metadata.search_term=search_term;
      resp.parse(result);
      if (resp._data.length>0){
        that._total+=resp._data.length;
        resp.insert(configs.PERSISTENCE);
        that.pagination(search_term, result);
        }
      console.log("(•) Youtube Search total: "+that._total+". Page: "+that.countPages);
    });
  }

}

tSearch.prototype.build_client=function(){
  this.client = new Youtube();
  this.client.setKey(configs.API_KEY);
  this.client.addParam('type', 'video');
}


module.exports=tSearch

var exports=module.exports;
var data=require('./persistance.js');

var response=function() {
  this.metadata={};
  this._data=[];

  this.parse=function(resps){
    var items=resps.items;
    for (i=0; i<items.length; i++){

      var resp=items[i];

      var parsed_resp={
        item_id:resp.id.videoId,
        item_kind:resp.id.kind,
        created_at:resp.snippet.publishedAt,
        description:resp.snippet.description,
        title:resp.snippet.title,
        channel_title:resp.snippet.channelTitle,
        channel_id:resp.snippet.channelId,
        }

      this._data.push(parsed_resp);

      }
  }

  this.insert=function(db_type){
    var dbees=data.DBS[db_type];
  }

}

exports.response=response

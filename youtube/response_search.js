var exports=module.exports;


var response=function() {
  this.metadata={};
  this._data=[];

  this.parse=function(raw_obj){
    var resps=JSON.parse(raw_obj);
    var items=resps.items;
    for (i=0; items.length; i++){

      resp=items[i];

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
}

exports.response=response

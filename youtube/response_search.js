
var data=require('./persistance.js');
var torch= require('../torch/dbUtils.js');

var esUtils=torch.esUtils;

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
        description_cloud:esUtils.textToWordsList(resp.snippet.description),
        title:resp.snippet.title,
        title_cloud:esUtils.textToWordsList(resp.snippet.title),
        channel_title:resp.snippet.channelTitle,
        channel_id:resp.snippet.channelId,
        search_term:this.metadata.search_term,
        search_created_at:this.metadata.search_created_at
        }

      this._data.push(parsed_resp);

      }
  }

  this.insert=function(db_type){
    var dbees=data.DBS[db_type];
    for (i=0;i<this._data.length; i++){
      var doc=this._data[i];
      dbees.insert_doc(doc);
      //console.log('(•) INSERTED DOC', doc)

    }
  }

}

module.exports=response

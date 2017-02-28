var exports = module.exports;


var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

var doctype='youtube';

var YouES = {


  insert_doc:function (doc) {
    var datis=new Date(new Date().getTime());
    var _id=doc['item_id']
    client.index({
      index: esUtils.index,
      type: doctype,
      id:esUtils.time_id(_id),
      body: doc,
      },function(err,resp,status) {
        console.log("(•) INSERT: ",resp);
    });
  },

  delete_all: esUtils.delete_all_byType.bind(this, client, esUtils.index, doctype),

  update_doc:function (id, doc) {
      client.update({
        index:esUtils.index,
        type:doctype,
        id:id,
        body:doc,
      },function(err, resp, status){console.log("(•) UPDATE: ", resp)})
  },


}


//api
exports.DBS={"elasticsearch":YouES, "cassandra":none};


var elasticsearch = require('elasticsearch');
var torch= require('../torch/dbUtils.js');


var esUtils=torch.esUtils;

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  //log: 'trace'
});


var BaseES = {

  doctype:undefined,


  test_index:esUtils.test_torch.bind(this, client, this.doctype),

  insert_doc:function (doc) {

    var datis=new Date(new Date().getTime());
    var _id=doc['item_id'];
    doc.origin=this.doctype;
    client.index({
      index: esUtils.index,
      type: this.doctype,
      id:esUtils.time_id(_id),
      body: doc,
      },function(err,resp) {
        //console.log("(•) INSERTED: ",resp);
    });
  },

  delete_all: function() {
      client.deleteByQuery({
        'index':esUtils.index,
        'type':this.doctype,
        'body':{'query':{'term':{'origin':this.doctype}}}}),
        function(err,resp,status) {
          console.log("(•) Deleted",resp);
        }
    },

  update_doc:function (id, doc) {
      client.update({
        index:esUtils.index,
        type:this.doctype,
        id:id,
        body:doc,
      },function(err, resp, status){console.log("(•) UPDATE: ", resp)})
  },


}




module.exports=BaseES;

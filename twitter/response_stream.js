
function streamResponse (tweetObj, userObj) {
  this.tweetObj=tweetObj;
  this.userObj=userObj;
}

streamResponse.prototype._insert_obj=function (strObj, type) {
  var _tablis={
    tweet:'twitter_trends.tweets',
    user:'twitter_trends.users'
  }
  type=test_input(type, 'tweet');
  var table_name=_tablis[type];
  var query=format("INSERT INTO {} JSON '{}'", table_name,strObj);
  _CONN.client.execute(query, function (err, result) {
      if (err) {
          _CONN.client.shutdown();
          var msg=format('Fail  while trying to insert \
                          table: [{}]. Error:[{}]',  table_name, err);
          return console.error(msg);
          }
  });
}

streamResponse.prototype.insert=function () {
  //test connection
  if (Object.keys(_CONN).indexOf('client') < 0 || ! _CONN.client.connected){
    connect();
    console.log('[++] NEW CON',_CONN);

  }

  var tweetJsonString=this.tweetObj.toJsonString();
  var userJsonString=this.userObj.toJsonString();

  console.log(userJsonString);

  this._insert_obj(tweetJsonString,'tweet');
  this._insert_obj(userJsonString,'user');

  console.log('[+] INSERTED TWEET ::', this.tweetObj.text);
  console.log('[+] INSERTED USER ::', this.userObj.screen_name);

}



function parseStreamTweet(tweetStreamObj){
    //create objs
    var tweetObj= new tweetis(tweetStreamObj);
    var userObj=new useris(tweetStreamObj.user);
    //cross fields update
    //userObj.tweet=tweetObj.id
    //done
    return new streamResponse (tweetObj, userObj);

}

"use strict";

var exports = module.exports;

var cassandra = require('cassandra-driver');
var format = require('string-format');
var configs=require('./configs.json')
var helpers=require('./torch/helpers.js')

var TwCassandra = function () {
  this.client=undefined


  this.build_client=function(nodes){
    var nodes = helpers.test_input(nodes, ['192.168.99.101']);
    this.client=new cassandra.Client({ contactPoints: nodes});
    this.client.connect(function (err) {
        if (err) {
        this.client.shutdown();
        return console.error('[-] There was an error when connecting', err);
        }
        console.log('[+] Connected');
    });
  }

this.close=function (){this.client.shutdown;}


}


var _CONN={};

function connect (nodes){

    nodes = test_input(nodes, ['192.168.99.101']);

    _CONN.client=new cassandra.Client({ contactPoints: nodes});
    _CONN.client.connect(function (err) {
        if (err) {
        _CONN.client.shutdown();
        return console.error('[-] There was an error when connecting', err);
        }
        console.log('[+] Connected');
    });
}

function close (){
    _CONN.client.shutdown();
    console.log('Closing connection');
    _CONN={};

}

function createKeyspace(keyspace_name) {

    keyspace_name = test_input(keyspace_name, 'twitter_trends');

    var template =   "CREATE KEYSPACE IF NOT EXISTS keyspace_name \
                    WITH replication = {'class': 'SimpleStrategy', \
                    'replication_factor': '1' }";
    var query=template.replace('keyspace_name',keyspace_name);

    _CONN.client.execute(query, function (err, result) {
      if (err) {
            _CONN.client.shutdown();
            var msg=format('Fail while trying to create \
                            keyspace: [{}]. Error:[{}]',  keyspace_name, err);
            return console.error(msg);
            }
    });
}

function createTrendsTable(table_name) {

    table_name = test_input(table_name, 'twitter_trends.trends');
    var template = "CREATE TABLE IF NOT EXISTS {} \
                    (uuid uuid, \
                    created_at timestamp, \
                    name text, \
                    query text, \
                    url text, \
                    location text, \
                    PRIMARY KEY(uuid))";
    var query=format(template, table_name);
    _CONN.client.execute(query, function (err, result) {
        if (err) {
            _CONN.client.shutdown();
            var msg=format('Fail  while trying to create \
                            table: [{}]. Error:[{}]',  table_name, err);
            return console.error(msg);
            }
    });
}

function createTweetsTable(table_name) {

    table_name = test_input(table_name, 'twitter_trends.tweets');
    var template = "CREATE TABLE IF NOT EXISTS {} \
                    (id bigint, \
                    created_at timestamp, \
                    hashtags list <text>, \
                    urls list <text>, \
                    user_mentions list <text>, \
                    in_reply_to_user_id bigint, \
                    metadata text, \
                    coordinates text, \
                    place text, \
                    retweet_count int, \
                    in_reply_to_status_id bigint, \
                    text text, \
                    user bigint, \
                    source varchar, \
                    favorite_count bigint, \
                    quoted_status_id bigint, \
                    lang varchar, \
                    PRIMARY KEY(id))";
    var query=format(template, table_name);
    _CONN.client.execute(query, function (err, result) {
        if (err) {
            _CONN.client.shutdown();
            var msg=format('Fail  while trying to create \
                            table: [{}]. Error:[{}]',  table_name, err);
            return console.error(msg);
            }
    });
}

function createUsersTable(table_name) {

    table_name = test_input(table_name, 'twitter_trends.users');
    var template="CREATE TABLE IF NOT EXISTS {} \
                    (id bigint, \
                    created_at timestamp, \
                    name varchar, \
                    screen_name varchar, \
                    profile_image_url text, \
                    location  text, \
                    description text, \
                    url text, \
                    utc_offset int, \
                    lang varchar, \
                    geo_enabled boolean, \
                    time_zone varchar, \
                    profile_background_image_url text, \
                    followers_count bigint, \
                    listed_count bigint, \
                    favourites_count bigint, \
                    statuses_count bigint, \
                    friends_count bigint, \
                    PRIMARY KEY(id))";
    var query=format(template, table_name);
    _CONN.client.execute(query, function (err, result) {
        if (err) {
            _CONN.client.shutdown();
            var msg=format('Fail  while trying to create \
                            table: [{}]. Error:[{}]',  table_name, err);
            return console.error(msg);
            }
    });


    }


function dbObj () {

    this.keys=function(){
    return Object.keys(this).filter(function(k) {
        if (k!='keys'){return k}
        });
    }

    this.toJson=function(){
        var keys=this.keys();
        var json={};
        for (var i=0;i<keys.length;++i){
            var k=keys[i];
            if (k=='toJson'){continue};
            var v=this[k];
            json[k]=v;
        }
        return json
    }

    this.toJsonString=function () {
      return JSON.stringify(this.toJson());

    }

}

function _toStringis(obj){
  if (typeof obj == undefined || obj == null){
    return null
  }
  return JSON.stringify(obj);
}

function tweetis (tweet){
    this.id=tweet.id;
    if (tweet.text != undefined) {
      this.text=tweet.text.replace("'", "");
                        }
    this.created_at=new Date(Date.parse(tweet.created_at));
    if (tweet.entities != undefined){
      var enkeys=Object.keys(tweet.entities);
      if (enkeys.indexOf('hashtags') > -1) {
        this.hashtags=tweet.entities.hashtags.map(function(e){return e.text});
      }
      if (enkeys.indexOf('urls') > -1) {
        this.urls=tweet.entities.urls.map(function(e){return e.expanded_url});
      }
      if (enkeys.indexOf('user_mentions') > -1) {
        this.user_mentions=tweet.entities.user_mentions.map(
                                            function(e){return e.screen_name});
      }
    }
    this.in_reply_to_user_id=tweet.in_reply_to_user_id;
    this.in_reply_to_status_id=tweet.in_reply_to_status_id;
    this.coordinates=_toStringis(tweet.coordinates);
    this.user=tweet.user.id;
    this.place=_toStringis(tweet.place);
    this.retweet_count=tweet.retweet_count;
    this.in_reply_to_status_id=tweet.in_reply_to_status_id;
    this.source=tweet.source;
    this.favorite_count=tweet.favorite_count;
    this.quoted_status_id=tweet.quoted_status_id;
    this.lang=tweet.lang;
}

tweetis.prototype=new dbObj();


function useris (user){
    this.id=user.id;
    this.created_at=new Date(Date.parse(user.created_at));
    this.name=user.name;
    this.screen_name=user.screen_name;
    this.profile_image_url=user.profile_image_url;
    this.location=user.location;
    this.description=user.description;
    this.url=user.url;
    this.utc_offset=user.utc_offset;
    this.lang=user.lang;
    this.geo_enabled=user.geo_enabled;
    this.time_zone=user.time_zone;
    this.profile_background_image_url=user.profile_background_image_url;
    this.followers_count=user.followers_count;
    this.listed_count=user.listed_count;
    this.favourites_count=user.favourites_count;
    this.statuses_count=user.statuses_count;
    this.friends_count=user.friends_count;
}

useris.prototype=new dbObj();

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

function showTrendsTables(){
  var query="select table_name from system_schema.tables \
             where keyspace_name='twitter_trends';"
  _CONN.client.execute(query, function(error, result){
    console.log(result)
  });
}

//console.log(process.argv.slice(2).length);

exports.parseStreamTweet=parseStreamTweet;
exports.createTweetsTable=createTweetsTable;
exports.createUsersTable=createUsersTable;
exports.createKeyspace=createKeyspace;
exports.createTrendsTable=createTrendsTable;
exports.showTrendsTables=showTrendsTables;
exports.connect=connect;
exports.close=close;

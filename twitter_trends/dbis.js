"use strict";
var cassandra = require('cassandra-driver');
var format = require('string-format');

var _CONN={};

function test_input(variable, default_value){
    if (typeof variable !== 'undefined') {
        return variable;
    }
    return default_value;
}

function connect (nodes){
    
    nodes = test_input(nodes, ['127.0.0.1']);
    
    _CONN.client=new cassandra.Client({ contactPoints: nodes});
    _CONN.client.connect(function (err) {
        if (err) {
        client.shutdown();
        return console.error('[-] There was an error when connecting', err);
        }
        console.log('[+] Connected to cluster with %d host(s): %j', client.hosts.length, client.hosts.keys());
        console.log('[+] Keyspaces: %j', Object.keys(client.metadata.keyspaces));
    });
}       

function close (){
    console.log('Shutting down');
    client.shutdown();
}

function createKeyspace(keyspace_name) {
    
    keyspace_name = test_input(keyspace_name, 'twitter_trends');

    var tempale =   "CREATE KEYSPACE IF NOT EXISTS keyspace_name \
                    WITH replication = {'class': 'SimpleStrategy', \
                    'replication_factor': '3' }";
    var query=template.replace('keyspace_name',keyspace_name);
    client.execute(query, function (err, result) {
        if (err) {
            client.shutdown();
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
    client.execute(query, function (err, result) {
        if (err) {
            client.shutdown();
            var msg=format('Fail  while trying to create \
                            table: [{}]. Error:[{}]',  table_name, err);
            return console.error(msg);
            }
    });
}

function createTweetsTable(table_name) {

    table_name = test_input(table_name, 'twitter_trends.tweets');
    var template = "CREATE TABLE IF NOT EXISTS {} \
                    (id int, \
                    created_at timestamp, \
                    hashtags list <text>, \
                    urls list <text>, \
                    user_mentions list <text>, \
                    in_reply_to_user_id int, \
                    metadata map, \
                    coordinates map, \
                    place map, \
                    retweet_count int, \
                    in_reply_to_status_id int, \
                    text text, \
                    user int, \
                    source varchar, \
                    favorite_count int, \
                    quoted_status_id int, \
                    lang varchar, \
                    PRIMARY KEY(id))";
    var query=format(template, table_name);
    client.execute(query, function (err, result) {
        if (err) {
            client.shutdown();
            var msg=format('Fail  while trying to create \
                            table: [{}]. Error:[{}]',  table_name, err);
            return console.error(msg);
            }
    });
}

function createUsersTable(table_name) {

    table_name = test_input(table_name, 'twitter_trends.users');
    var template="CREATE TABLE IF NOT EXISTS {} \
                    (id int, \
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
                    followers_count int, \
                    listed_count int, \
                    favourites_count int, \
                    statuses_count int, \
                    friends_count int, \
                    PRIMARY KEY(id))";
    var query=format(template, table_name);
    client.execute(query, function (err, result) {
        if (err) {
            client.shutdown();
            var msg=format('Fail  while trying to create \
                            table: [{}]. Error:[{}]',  table_name, err);
            return console.error(msg);
            }
    });
    
    
    }

function insertTweet(tweetObj){

}

function insertUser(userObj){

}

function dbObj () {

    this.keys=function(){
    return Object.keys(this).filter(function(k) { 
        if (k!='keys'){return k}
        });
    } 
    
    this.toJson=function(){
        var keys=this.keys();
        var json=[];
        for (i=0;i<keys.length;++i){
            temp={};
            var k=keys[i];
            if (k=='toJson'){continue};
            var v=this[k];
            temp[k]=v
            json.push(temp);
        }
        return json
    }

}


function tweetis (tweet){
    this.id=tweet.id;
    this.text=tweet.text;
    this.description=tweet.description;
    this.created_at=new Date(Date.parse(tweet.created_at));
    this.location=tweet.location;
    this.hashtags=tweet.entities.hashtags.map(function(e){return e.text});
    this.urls=tweet.entities.urls.map(function(e){return e.expanded_url});
    this.user_mentions=tweet.entities.user_mentions.map(
                                            function(e){return e.screen_name});
    this.in_reply_to_user_id=tweet.in_reply_to_user_id;
    this.metadata=tweet.metadata;
    this.in_reply_to_status_id=tweet.in_reply_to_status_id;       
    this.coordinates=tweet.coordinates;
    this.user=tweet.user.id;
    this.place=tweet.place;
    this.retweet_count=tweet.retweet_count;
    this.in_reply_to_status_id=tweet.in_reply_to_status_id;
    this.text=tweet.text;
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
    this.screen_name=user.user_name;
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



function parseStreamTweet(tweetStreamObj){
    //create objs
    var tweetObj= new tweetis(tweetStreamObj);
    var userObj=new useris(tweetStreamObj.user);
    //cross fields update
    userObj.tweet=tweetObj.id
    //done
    return {'tweet':tweetObj, 'user':userObj};
}

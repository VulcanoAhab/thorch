"use strict";
var cassandra = require('cassandra-driver');
var format = require('string-format');

var _CONN={};

function connect (nodes=['127.0.0.1']){
    
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

function createKeyspace(keyspace_name='twitter_trends') {
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
        });
}

function createTrendsTable(table_name='twitter_trends.trends') {
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
        });
    }

function createTweetsTable(table_name='twitter_trends.tweets') {
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
                    txt text, \
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
        });
    }

function createUsersTable(table_name='twitter_trends.users') {
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
        });
    
    
    }

function insertTweet(tweetObj, table_name='twitter_trends.tweets'){

}

function insertUser(userObj, table_name='twitter_trends.tweets'){

}

function parseStreamTweet(tweetStreamObj){
    return {'tweet':tweetObj, 'user'userObj};
}

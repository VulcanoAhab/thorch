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
    client.execute(query function (err, result) {
        if (err) {
            client.shutdown();
            var msg=format('There was while trying to create \
                            keyspace: [{}]. Error:[{}]',  keyspace_name, err);
            return console.error(msg);
        });
}

function createTrendsTable(table_name='twitter_trends.trends') {
   /** var template = "CREATE TABLE IF NOT EXISTS {} ";
    var query=format(template, table_name);
    client.execute(query);
    **/
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
    client.execute(query);
    }


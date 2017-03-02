"use strict";

var exports = module.exports;

var cassandra = require('cassandra-driver');
var format = require('string-format');
var configs=require('./configs.json')
var helpers=require('./torch/helpers.js')

var Cassandra = function () {
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

  this.close=function (){
    this.client.shutdown();
    this.client=undefined;
  }

  this.createKeyspace=function(keyspace_name){
    keyspace_name = helpers.test_input(keyspace_name, 'twitter_trends');

    var template =  "CREATE KEYSPACE IF NOT EXISTS keyspace_name \
                  WITH replication = {'class': 'SimpleStrategy', \
                  'replication_factor': '1' }";

    var query=template.replace('keyspace_name',keyspace_name);

    this.client.execute(query, function (err, result) {
      if (err) {
          this.client.shutdown();
          var msg=format('Fail while trying to create \
                          keyspace: [{}]. Error:[{}]',  keyspace_name, err);
          return console.error(msg);
          }
    });
  }

  this.createTrendsTable=function(table_name) {
    table_name = helpers.test_input(table_name, 'twitter_trends.trends');
    var template = "CREATE TABLE IF NOT EXISTS {} \
                      (uuid uuid, \
                      created_at timestamp, \
                      name text, \
                      query text, \
                      url text, \
                      location text, \
                      PRIMARY KEY(uuid))";
    var query=format(template, table_name);
    this.client.execute(query, function (err, result) {
      if (err) {
            this.client.shutdown();
            var msg=format('Fail  while trying to create \
                              table: [{}]. Error:[{}]',  table_name, err);
            return console.error(msg);
            }
      });
  }

  this.createTweetsTable(table_name) {
      table_name = helpers.test_input(table_name, 'twitter_trends.tweets');
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
      this.client.execute(query, function (err, result) {
        if (err) {
          this.client.shutdown();
          var msg=format('Fail  while trying to create \
                              table: [{}]. Error:[{}]',  table_name, err);
          return console.error(msg);
          }
      });
  }

this.createTweetsTable=function(table_name) {

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
    this.client.execute(query, function (err, result) {
        if (err) {
            this.client.shutdown();
            var msg=format('Fail  while trying to create \
                            table: [{}]. Error:[{}]',  table_name, err);
            return console.error(msg);
            }
    });
 }

 this.createUsersTable(table_name) {
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
     this.client.execute(query, function (err, result) {
         if (err) {
             this.client.shutdown();
             var msg=format('Fail  while trying to create \
                             table: [{}]. Error:[{}]',  table_name, err);
             return console.error(msg);
             }
      });
 }

 this.showTrendsTables=function (){
   var query="select table_name from system_schema.tables \
              where keyspace_name='twitter_trends';"
   this.client.execute(query, function(error, result){
     console.log(result)
   });
 }

}



exports.Cassandra=Cassandra;
//console.log(process.argv.slice(2).length);

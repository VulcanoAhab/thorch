var exports = module.exports;

var obis=require("../torch/dbUtils.js")
var mapis=require("../torch/responseUtils.js")
var objUtils=obis.objUtils;

//prepare trend base
var TrendBase=new mapis.Mapper();
TrendBase.setFields(['name', 'url', 'promoted_content',
                     'tweet_volume', 'date', 'date_type']);

function Trend (trend, date, locations) {
  if (!trend){
    console.log('[-] Fail: empty trend object');
    return}
  if (!locations) {
    console.log('[-] Fail: no local no trend parsing');
    return}
  //check date
  if (!date){
    var now = new Date();
    date=now.toISOString();
    var date_type='from_parser';
  } else {
    date=new Date(date).toISOString();
    var date_type='from_object';
  }
  //add dates
  trend['date']=date;
  trend['date_type']=date_type;
  trend['locations']=locations.map(function(e){return e.name});
  //process
  return TrendBase.process(trend)
}



function Tweet (tweet) {
    this.id=tweet.id;

    if (tweet.text != undefined) {
      this.text=tweet.text.replace(" ", "");
                        }
    this.created_at=new Date(Date.parse(tweet.created_at));

    if (tweet.entities != undefined){
      var enkeys=Object.keys(tweet.entities);
      if (enkeys.indexOf("hashtags") > -1) {
        this.hashtags=tweet.entities.hashtags.map(function(e){return e.text});
      }
      if (enkeys.indexOf("urls") > -1) {
        this.urls=tweet.entities.urls.map(function(e){return e.expanded_url});
      }
      if (enkeys.indexOf("user_mentions") > -1) {
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

//tweetis.prototype=new objUtils.dbObj();



function User (user){
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

//useris.prototype=new objUtils.dbObj();






exports.Tweet=Tweet
exports.Trend=Trend;

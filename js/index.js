(function(document, window, $, corpus, data) {
  'use strict';


  function computeSentiment(tweetStr, corpusData) {
    // remove commonly encountered words
    var filteredTweet = tweetStr
                        .replace(/\B@[a-z0-9_-]+/gi,'') //remove twitter handles
                        .toLowerCase() // normalize to lowercase
                        .replace('rt','') // remove RTs if any
                        .trim(); // remove trailing whitespaces

    var wordArray = filteredTweet.split(' ');
    var sentimentSum;
    var corpusWords = Object.keys(corpusData); //transform corpus object to array of its keys

    var sentimentArray = wordArray.map(function(word) {
      return corpusWords.filter(function(corpus) {
         return word.indexOf(corpus) > -1;
      })
      .reduce(function(a, b) {
        return a.concat(b);
      }, '');
    })
    .filter(function(arr) {
      return arr.length > 0;
    })
    .map(function(word) {
      return corpusData[word];
    })
    .reduce(function(a, b) {
      return a + b;
    }, 0);


    return sentimentArray;
  }

  function mapSentimentToIcon(sentiment) {
    switch(sentiment) {
      case 0 :
      return ':|';
      case sentiment < 0:
      return ':(';
      default:
      return ':)';
    }
  };

  window.computeSentiment  = computeSentiment;

  $(document).ready(function() {
    var dateTweeted;


    for (var i = 0; i < 10; i++) {
      dateTweeted = new Date(data[i].created_at);
      var tweet = data[i];
      var buttonStr = '<button class="follow-button">Follow</button>';
      var imgStr = '<img class="profile-pic" height="48" width="48" src="' + tweet.user.profile_image_url + '" />';
      var userNameStr = '<label class="user">' + tweet.user.name + '</label>';
      var aliasStr = '<label class="alias">@' + tweet.user.screen_name + '</label>';

      $("#tweets-container").append(
        '<div class="tweet-container">'+
          buttonStr+imgStr+userNameStr+'<br />'+
          aliasStr+'<br />'+
          '<label class="user-tweet">' + tweet.text + '</label>'+
          '<label class="tweet-time">' + tweet.created_at + '</label>'+
          '<div>' + mapSentimentToIcon(computeSentiment(tweet.text, corpus)) + '</div>' +
        '</div>'
      );

      $(".profile-pic").on("error", function(){
          $(this).attr('src', 'img/twitter-logo.png');
      });
    }

    // animated scrolling
    $('#homePage').click(function() {
      var target = $('#tweetPage');
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }

    });
  });

}(document, window, $, window.corpus, window.data));

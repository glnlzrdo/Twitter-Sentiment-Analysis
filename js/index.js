(function(document, window, $, corpus, data) {
  'use strict';

  var PAGE_SIZE = 10;
  var CURRENT_PAGE = 0;
  var MAX_PAGES = Math.ceil(data.length/PAGE_SIZE);


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
      console.log(word);
      return corpusData[word];
    })
    .reduce(function(a, b) {
      return a + b;
    }, 0);


    return sentimentArray;
  }

  function mapSentimentToIcon(sentiment) {

    if(sentiment === 0) {
      return 'meh';
    } else if (sentiment < 0) {
      return 'sad';
    } else {
      return 'happy';
    }
  };

  window.computeSentiment  = computeSentiment;

  $(document).ready(function() {
    var dateTweeted;


    function renderTweets(tweetsArray, pageNumber, pageSize) {
      var tweetsContainer = $('#tweets-container');

      tweetsContainer[0].innerHTML = '';

      for (var i = pageSize*pageNumber; i < pageSize*(pageNumber +1); i++) {
        var tweet = tweetsArray[i];
        // render only when tweet is defined
        if(tweet) {
          var dateTweeted = new Date(tweet.created_at);
          var buttonStr = '<button class="follow-button">Follow</button>';
          var imgStr = '<img class="profile-pic" height="48" width="48" src="' + tweet.user.profile_image_url + '" />';
          var userNameStr = '<label class="user">' + tweet.user.name + '</label>';
          var aliasStr = '<label class="alias">@' + tweet.user.screen_name + '</label>';

          tweetsContainer.append(
            '<div class="tweet-container">'+
              buttonStr+imgStr+userNameStr+'<br />'+
              aliasStr+'<br />'+
              '<label class="user-tweet">' + tweet.text + '</label>'+
              '<label class="tweet-time">' + tweet.created_at + '</label>'+
              '<div class="sentiment-icon"><img src="./img/' + mapSentimentToIcon(computeSentiment(tweet.text, corpus)) + '.png"/></div>' +
            '</div>'
          );

          $(".profile-pic").on("error", function(){
              $(this).attr('src', 'img/twitter-logo.png');
          });
        }
      }
    }


    function scroll(target) {

      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
    // animated scrolling
    $('#homePage').click(function() {
      scroll($('#tweetPage'));

    });

    $('#nextButton').click(function() {
      if(CURRENT_PAGE + 1 < MAX_PAGES) {
        CURRENT_PAGE++;
        renderTweets(data, CURRENT_PAGE, PAGE_SIZE);
        $('#previousButton').attr('disabled', false);
        scroll($('#tweetPage'));
      } else {
        console.log('AA');
        $(this).attr('disabled', true);
      }
    });

    $('#previousButton').click(function() {
      if(CURRENT_PAGE - 1 >= 0) {
        CURRENT_PAGE--;
        renderTweets(data, CURRENT_PAGE, PAGE_SIZE);

        $('#nextButton').attr('disabled', false);
        scroll($('#tweetPage'));
      } else {
        console.log('AA');
        $(this).attr('disabled', true);
      }
    })

      scroll($('#homePage'));
      renderTweets(data, CURRENT_PAGE, PAGE_SIZE); //render first page
      $('#previousButton').attr('disabled', true);
  });

}(document, window, $, window.corpus, window.data));

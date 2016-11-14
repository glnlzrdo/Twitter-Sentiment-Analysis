(function(document, window, $, corpus, data) {
  'use strict';


  function computeSentiment(tweetStr, corpusData) {
    var tweetWords = tweetStr.split(" ");
    var count = 0, repeated = 0;

    for (var i in tweetWords){
      var isSenti = corpusData[ tweetWords[i].toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ") ];

      if(isSenti != undefined){
        count += isSenti;
        repeated++;
      }
    }    
    return count / repeated;
  }

  function mapSentimentToIcon(sentiment) {

    if(sentiment > 0) {
      return 'img/happy.gif';
    } else if (sentiment < 0) {
      return 'img/sad.gif';
    } else {
      return 'img/neut.jpg';
    }
  };

  window.computeSentiment  = computeSentiment;

 var tweetBatch = 0;

  $(document).ready(function() {
    loadTweets();
    $("#tweetPage").append('<div class="navContainer">' +
          '<div class="toggle-button">' +
              '<button class="toggleMood">Toggle Mood</button>' +
          '</div>' +          
          '<button class="loaderPrev">Previous 10 Tweets</button>' +
          '<button class="loader">Next 10 Tweets</button>' +
        '</div>');
    $('.loaderPrev').prop('disabled', true);
    // animated scrolling
    $('#homePage').click(navigateToTweets);

    $('.loader').click(function() {
      $('div.tweet-container').remove();
      tweetBatch += 10;
      loadTweets();
       $('.loaderPrev').prop('disabled', false);
    });

    $('.loaderPrev').click(function() {
      $('div.tweet-container').remove();
      tweetBatch -= 10;
      loadTweets();
      if (tweetBatch == 0) {
         $('.loaderPrev').prop('disabled', true);
      }
    });

    var isMoodActive = 1;
    $(".toggleMood").click(function() {      
        if (isMoodActive == 1) {
          $(".senti").css('display', 'none');
          isMoodActive = 0;
        } else {
          $(".senti").css('display', 'unset');
          isMoodActive = 1;
        }      
    });
  

  });

function navigateToTweets() {
      var target = $('#tweetPage');
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }

    }

function loadTweets() {
    for (var i = tweetBatch; i < (tweetBatch + 10); i++) {

      var tweet = data[i];

      var sentiStr = '<div class="senti">' +
                        '<img height="80" width="80" src="' + mapSentimentToIcon(computeSentiment(tweet.text, corpus)) + '" />' +
                      '</div>';
      var imgStr = '<img class="profile-pic" height="48" width="48" src="' + tweet.user.profile_image_url + '" />';
      var userNameStr = '<label class="user">' + tweet.user.name + '</label>';
      var aliasStr = '<label class="alias">@' + tweet.user.screen_name + '</label>';

      $("#tweets-container").append(
        '<div class="tweet-container">'+
          sentiStr +
          imgStr+userNameStr+'<br />'+
          aliasStr+'<br />'+          
          '<label class="user-tweet">' + tweet.text + '</label>'+
          '<label class="tweet-time">' + tweet.created_at + '</label>'+
        '</div>'
      );

      $(".profile-pic").on("error", function(){
          $(this).attr('src', 'img/twitter-logo.png');
      });
    }
    if (tweetBatch != 0) {
      navigateToTweets();
    }
}

}(document, window, $, window.corpus, window.data));

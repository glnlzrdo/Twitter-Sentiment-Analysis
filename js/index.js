(function(document, window, $, corpus, data) {
    'use strict';

    var PAGE_SIZE = 10;
    var CURRENT_PAGE = 0;
    var MAX_PAGES = Math.ceil(data.length / PAGE_SIZE);

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

        if (sentiment > 0) {
            return 'happy';
        } else if (sentiment < 0) {
            return 'sad';
        } else {
            return 'meh';

        }
    };

    function renderTweets(tweetsArray, pageNumber, pageSize) {
        var tweetsContainer = $('#tweets-container');

        tweetsContainer[0].innerHTML = '';

        for (var i = pageSize * pageNumber; i < pageSize * (pageNumber + 1); i++) {
            var tweet = tweetsArray[i];
            // render only when tweet is defined
            if (tweet) {
                var dateTweeted = new Date(tweet.created_at);
                var imgStr = '<img class="profile-pic" height="48" width="48" src="' + tweet.user.profile_image_url + '" />';
                var userNameStr = '<label class="user">' + tweet.user.name + '</label>';
                var aliasStr = '<label class="alias">@' + tweet.user.screen_name + '</label>';

                tweetsContainer.append(
                    '<div class="tweet-container">' + imgStr + userNameStr + '<br />' +
                    aliasStr + '<br />' +
                    '<label class="user-tweet">' + tweet.text + '</label>' +
                    '<label class="tweet-time">' + tweet.created_at + '</label>' +
                    '<div class="sentiment-icon"><img src="./img/' + mapSentimentToIcon(computeSentiment(tweet.text, corpus)) + '.png"/></div>' +
                    '</div>'
                );

                $(".profile-pic").on("error", function() {
                    $(this).attr('src', 'img/twitter-logo.png');
                });
            }
        }
    }

    // animated scrolling to an HTML element. target is a jQuery selector of
    // the element to be scrolled to.
    function scroll(target) {
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
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
        if (CURRENT_PAGE + 1 < MAX_PAGES) {
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
        if (CURRENT_PAGE - 1 >= 0) {
            CURRENT_PAGE--;
            renderTweets(data, CURRENT_PAGE, PAGE_SIZE);

            $('#nextButton').attr('disabled', false);
            scroll($('#tweetPage'));
        } else {
            console.log('AA');
            $(this).attr('disabled', true);
        }
    })

    var toggle = $('#toggleButton');
    var showIcons = true;

    toggle.click(function() {
      if(showIcons) {
        $('.sentiment-icon').hide();
        toggle.html('Show');
        showIcons = false;
      } else {
        $('.sentiment-icon').show();
        toggle.html('Hide');
        showIcons = true;
      }
    })

    scroll($('#homePage'));
    renderTweets(data, CURRENT_PAGE, PAGE_SIZE); //render first page
    $('#previousButton').attr('disabled', true);


}(document, window, $, window.corpus, window.data));

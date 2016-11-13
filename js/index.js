$(document).ready(function() {
  // var chart = Highcharts.chart('container', {
  //   chart: {
  //     type: 'column'
  //   },
  //   title: {
  //     text: 'Population of Countries'
  //   },
  //   subtitle: {
  //     text: 'Source: WorldClimate.com'
  //   },
  //   xAxis: {
  //     categories: [
  //       '2016 Population'
  //     ],
  //     crosshair: true
  //   },
  //   yAxis: {
  //     min: 0,
  //     title: {
  //       text: 'Population Count'
  //     }
  //   },
  //   tooltip: {
  //     headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
  //     pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
  //       '<td style="padding:0"><b>{point.y:.1f} people</b></td></tr>',
  //     footerFormat: '</table>',
  //     shared: true,
  //     useHTML: true
  //   },
  //   plotOptions: {
  //     column: {
  //       pointPadding: 0.2,
  //       borderWidth: 0
  //     }
  //   },
  //   series: [{"name": "Glenn","data":[500,800]}, {"name": "Charm","data":[700,500]}, {"name": "Glenn","data":[500,800]}, {"name": "Charm","data":[700,500]}, {"name": "Glenn","data":[500,800]}, {"name": "Charm","data":[700,500]}, {"name": "Glenn","data":[500,800]}, {"name": "Charm","data":[700,500]}, {"name": "Glenn","data":[500,800]}, {"name": "Charm","data":[700,500]}]
  // });

  var dateTweeted;


  for (var i = 0; i < 10; i++) {
     dateTweeted = new Date(data[i].created_at);
    $("#tweets-container").append('<div class="tweet-container"><button class="follow-button">Follow</button><img class="profile-pic" height="48" width="48" src="' + data[i].user.profile_image_url + '" /><label class="user">' + data[i].user.name + '</label><br /><label class="alias">@' + data[i].user.screen_name + '</label><br /><label class="user-tweet">' + data[i].text + '</label><label class="tweet-time">' + data[i].created_at + '</label></div>');
    $(".profile-pic").on("error", function(){
        $(this).attr('src', 'img/twitter-logo.png');
    });
  }

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

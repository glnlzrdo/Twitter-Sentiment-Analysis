$(function() {
  var chart = Highcharts.chart('container', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Population of Countries'
    },
    subtitle: {
      text: 'Source: WorldClimate.com'
    },
    xAxis: {
      categories: [
        '2016 Population'
      ],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Population Count'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} people</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{"name": "Glenn","data":[500,800]}, {"name": "Charm","data":[700,500]}]
  });

  console.log(corpus);
});

function formatPercentages(data) {
	//return data.map( e => ( Number(data.e) * 100 ) )	
	var output = []
}

function pieBuildChartData(sentiment, tweets) {
	var output = [];
	tweets.filter( e => e.sentiment === sentiment )	
				.forEach( (e, i) => output.push( [e.text, (i+1)] ) )
	return output;
}
function pieBuildChart(data) {
var percentages = data.percentages;
var tweets = data.tweets;
Highcharts.chart('chart', {
chart: {
type: 'pie'
},
title: {
text: 'Browser market shares. January, 2015 to May, 2015'
},
subtitle: {
text: 'Click the slices to view versions. Source: netmarketshare.com.'
},
plotOptions: {
series: {
dataLabels: {
enabled: true,
format: '{point.name}: {point.y:.1f}%'
}
}
},

tooltip: {
headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
},
		series: [{
name: 'Brands',
colorByPoint: true,
data: [{
name: 'Positive',
y: ( Number(percentages.positive ) * 100 ), // 
drilldown: 'Positive'
}, {
name: 'Neutral',
y: ( Number(percentages.neutral ) * 100 ),
drilldown: 'Neutral'
}, {
name: 'Negative',
y: ( Number(percentages.negative ) * 100 ),
drilldown: 'Negative'
}, {
name: 'Proprietary or Undetectable',
y: 0.2,
drilldown: null
}]
}],
drilldown: {
series: [{
name: 'Positive',
id: 'Positive',
data: [
['v11.0', 24.13],
['v8.0', 17.2],
['v9.0', 8.11],
['v10.0', 5.33],
['v6.0', 1.06],
['v7.0', 0.5]
]
}, {
name: 'Neutral',
id: 'Neutral',
data: [
['v40.0', 5],
['v41.0', 4.32],
['v42.0', 3.68],
['v39.0', 2.96],
['v36.0', 2.53],
['v43.0', 1.45],
['v31.0', 1.24],
['v35.0', 0.85],
['v38.0', 0.6],
['v32.0', 0.55],
['v37.0', 0.38],
['v33.0', 0.19],
['v34.0', 0.14],
['v30.0', 0.14]
]
}, {
name: 'Negative',
id: 'Negative',
data: pieBuildChartData("negative", tweets) 
} ]
								}
});
}



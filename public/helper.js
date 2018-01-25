// ===== Sunburst Chart Functions =====
function sunburstBuildPointData(tweets, data) {
	var output = []; 
	tweets.filter(e => e.sentiment === data.name)
				.map( (e, i) => output.push( {
																	"id": "", 
																	"parent": data.id,
																	"name": "Tweet#" + (i+1),
																	"value": (i+1),
																	"text": e.text
																  } )
									
				)
	return output				
}
function sunburstBuildChartData(tweet_data) { 
  var tweets = tweet_data.tweets;
				// percentage + sentiment label
  var data = [{"id": "0.0", "parent": "", "name": "sentiment"},
							{"id": "1.1", "parent": "0.0", "name": "positive"},
							{"id": "1.2", "parent": "0.0", "name": "neutral"},
							{"id": "1.3", "parent": "0.0", "name": "negative"}
						 ]; 
	data.slice(1).forEach( d =>  
															(sunburstBuildPointData(tweets,d))
														 	.forEach( e => data.push(e))
											 )
	data.slice(4).forEach( (e, i) => e.id = "2." + (i+1) ) 
	return data; 
}

function sunburstBuildChart(data) {
	tweets = data.tweets;
	username = tweets[0].username
	Highcharts.getOptions().colors.splice(0, 0, 'transparent');
	Highcharts.chart('chart', {
		chartHeight: "100%",
		title: {
						text: "" 
					 },
		subtitle: {
						text: '<a href="https://twitter.com/'+ username +'" >' + 'Chart loaded about @' + username  + '</a>'	
						  },
		series: [{
							type: "sunburst",	
							data: sunburstBuildChartData(data),
							allowDrillToNode: true,
							cursor: "pointer",
							dataLabels: {
												   format: "{point.name}",
													 filter: {
																		property: "innerArcLength",
																	 	operator: ">",
																	 	value: 		"15"
																	 }	
													},
						 levels: [
										 {
											 level: 2,
											 colorByPoint: true,
										 },	
										{
											 level: 3,
											 colorVariation: 
																		  {
																			 key: "brightness",
																				to: -0.5
																			}
										},
										{
											level: 4,
											colorVariation: {
												key: 'brightness',
												 to: 0.5

											}
										}
										]
					 }],
		tooltip: {
							headerFormat: "",
							pointFormat: "{point.text}" 
						 }	
	});

}
// ===== print type of instance =====
function typeLookUp(instance) {
  return Object.prototype.toString.call(instance)
}

// ===== AJAX =====
function getSentiment(handle) {
  $.ajax({
    type: 'GET',
    url: 'analyzer',
    dataType: 'json',
    data: {"query": handle}, 
    success: function(data) {
      $('#loading').html('');
			sunburstBuildChart(data);
		} 
	}); 
}

// ===== Sunburst Chart From HighCharts.js =====
function sunburstBuildPointData(tweets, data) {
	var output = []; 
	tweets.filter(e => e.sentiment === data.name)
				.map( (e, i) => output.push( {
																	"id": "", 
																	"parent": data.id,
																	"name": "tweet#" + (i+1),
																	"value": e.text
																  } )
									
				)
	return output				
}
function sunburstBuildChartData(tweets ) { 
  var data = [{"id": "0.0", "parent": "", "name": "sentiment"},
							{"id": "1.1", "parent": "0.0", "name": "positive"},
							{"id": "1.3", "parent": "0.0", "name": "negative"}
						 ]; 
							// fix sentiment algo from external service 
							//{"id": "1.2", "parent": "0.0", "name": "neutral"}, 
	data.slice(1).forEach( d =>  
															(sunburstBuildPointData(tweets,d))
														 	.forEach( e => data.push(e))
											 )
	data.slice(3).forEach( (e, i) => e.id = "2." + (i+1) ) // slice(4) including neutral
	return data; 
}

function sunburstBuildChart(tweets) {
	Highcharts.getOptions().colors.splice(0, 0, 'transparent');
	Highcharts.chart('chart', {
		chartHeight: "100%",
		title: {
						text: "Sentiment Analysis for insert **Handle**" 
					 },
		subtitle: {
						   text: "insert link to twitter page"	
						  },
		series: [{
							type: "sunburst",	
							data: data,
							allowToDrillNode: true,
							cursor: "pointer",
							dataLabels: {
												   format: "{point.name}"
													},
						 levels: [
										 {
											 level: 2,
											 colorByPoint: true,
											 dataLabels: {
																		rotationMode: "parallel"																		 
																	 }
										 },	
										{
											 level: 3,
											 colorVariation: 
																		  {
																			 key: "brightness",
																				to: -0.5
																			}
										}	
										]
					 }],
		tooltip: {
							headerFormat: "",
							pointFormat: "{point.value}" 
						 }	
	});

}

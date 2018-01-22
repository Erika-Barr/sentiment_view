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
function sunburstBuildChartData(tweets ) { 
  var data = [{"id": "0.0", "parent": "", "name": "sentiment"},
							{"id": "1.1", "parent": "0.0", "name": "positive"},
							{"id": "1.2", "parent": "0.0", "name": "neutral"},
							{"id": "1.3", "parent": "0.0", "name": "negative"}
						 ]; 
							// fix sentiment algo from external service 
							//{"id": "1.2", "parent": "0.0", "name": "neutral"}, 
	data.slice(1).forEach( d =>  
															(sunburstBuildPointData(tweets,d))
														 	.forEach( e => data.push(e))
											 )
	data.slice(4).forEach( (e, i) => e.id = "2." + (i+1) ) // slice(4) including neutral
	console.log(data);
	return data; 
}

function sunburstBuildChart(data) {
	tweets = data.tweets;
	username = tweets[0].username
	Highcharts.getOptions().colors.splice(0, 0, 'transparent');
	Highcharts.chart('chart', {
		chartHeight: "100%",
		title: {
						text: "Sentiment Analysis for insert **Handle**" 
					 },
		subtitle: {
						text: '<a href="https://twitter.com/'+ username +'" >' + 'Twitter Profile for @' + username  + '</a>'	
						  },
		series: [{
							type: "sunburst",	
							data: sunburstBuildChartData(tweets),
							allowToDrillNode: true,
							cursor: "pointer",
							dataLabels: {
												   format: "{point.name}",
													 filter: {
																		property: "innerArcLength",
																	 	operator: ">",
																	 	value: 		"10"
																	 }	
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
							pointFormat: "{point.text}" 
						 }	
	});

}
// ===== print type of instance =====
function typeLookUp(instance) {
  return Object.prototype.toString.call(instance)
}

// ===== Set CSS Color For Sentiments =====
function colorSentiment(sentiment) {
	var colors = {
		"positive": "panel-success",
		"neutral": "panel-primary",
		"negative": "panel-danger"
	}
	return colors[sentiment]
}

// ===== Make HTML For Each Tweet =====
function tweetsToHTML(tweets) {
	return ("<div>\n" 
					+ tweets.map(e => [ "<div class = 'panel "+ colorSentiment(e.sentiment) +"'> ", 
					      								"<div class = 'panel-heading'>", 
					      								  "<h3 class = 'panel-title' >",
					      					 				  e.username,
					      								  "</<h3>",
					      								"</div>",
					      								"<div class='panel-body'>",
					      									"<blockquote>",
					      										e.text,
					      								  "</blockquote>",
					      								"</div>",		
					      					   "</div>" ]
									)
						 			.map( e => e.join("") )
						 			.join("\n")  
						 			+ "\n</div>")
}

// ===== AJAX =====
function getSentiment(handle, e) {
	e.preventDefault();
  $.ajax({
    type: 'GET',
    url: 'analyzer',
    dataType: 'json',
    data: {"query": handle}, 
    success: function(data) {
			console.log(data)
			var container = $("#display_user_timeline");
			//data.tweets -> type Array
			sunburstBuildChart(data);
			content = tweetsToHTML(data.tweets);
			container.html(content);
			$("#tweetCount").text(data.tweets.length)
		} 
	}); 
}

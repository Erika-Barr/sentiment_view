function typeLookUp(instance) {
  return Object.prototype.toString.call(instance)
}

function colorSentiment(sentiment) {
	var colors = {
		"positive": "panel-success",
		"neutral": "panel-primary",
		"negative": "panel-danger"
	}
	return colors[sentiment]
}

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

function renameMe(handle, e) {
	e.preventDefault();
  $.ajax({
    type: 'GET',
    url: 'analyzer',
    dataType: 'json',
    data: {"query": handle}, 
    success: function(data) {
			console.log(data.tweets.length)
			var container = $("#display_user_timeline");
			//data.tweets -> type Array
			var tweetData = data.tweets;
			console.log(tweetsToHTML(tweetData));			
			content = tweetsToHTML(tweetData);
			container.html(content);
			$("#tweetCount").text(tweetData.length)
		} 
	}); 
}

 
//JSON #stringify and #parse
//seeing instance type -> Object.prototype.toString.call(twitterHandle)

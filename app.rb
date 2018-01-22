require 'rubygems'
require 'sinatra'
require 'haml'
require 'open-uri'
require 'pry' 
get '/' do
	@tweets = {'data': 'enter a twitter handle please'}
  haml :index
end

get '/analyzer' do
	# python sentiment service
  uri = "https://mighty-shelf-28167.herokuapp.com/analyze/#{request['query']}"
	
	# returns JSON response
	twitter_analysis = URI.parse(uri).read 
end

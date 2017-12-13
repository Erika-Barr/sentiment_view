require 'rubygems'
require 'sinatra'
require 'haml'
require 'open-uri'
require 'json'
require 'pry' 
get '/' do
	@tweets = {'data': 'enter a twitter handle please'}
  haml :index
end

get '/analyzer' do
  uri = "https://mighty-shelf-28167.herokuapp.com/analyze/#{request['query']}"
	twitter_analysis = URI.parse(uri).read
end

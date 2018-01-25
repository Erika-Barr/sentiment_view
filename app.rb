require 'rubygems'
require 'sinatra/base'
require 'haml'
require 'open-uri'
require 'pry' 
class App < Sinatra::Base
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
end

#App.run!

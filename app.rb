require 'rubygems'
require 'sinatra'
require 'haml'
require 'open-uri'
require 'json'

get '/' do
	@tweets = {'data': 'enter a twitter handle please'}
  haml :index
end

get '/analyzer' do
  params[:twitterHandle] ||= 'need to set instance variable in controller'				
  @tweets =	{'data': "100 analyzed tweets for #{params[:twitterHandle]}"}
	haml :index
end

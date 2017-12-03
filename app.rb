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
  uri = "https://mighty-shelf-28167.herokuapp.com/analyze/#{params[:twitterHandle]}"
  params[:twitterHandle] ||= 'need to set instance variable in controller'				
	@polarity = URI.parse(uri).read
	haml :index
end

=begin
@tweets =	{'data': "100 analyzed tweets for #{params[:twitterHandle]}\n polarity: #{polarity}" }
=end

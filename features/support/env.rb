require_relative '../../app' 
require 'capybara/cucumber'
require 'capybara/poltergeist'
require 'selenium-webdriver'

Capybara.app = App

Capybara.register_driver :selenium do |app|
	Capybara::Selenium::Driver.new(
		app,
	  browser: :chrome,
		args: ['headless']
	)
end

Capybara.register_driver :rack_test do |app|
	Capybara::RackTest::Driver.new(app, headers: { 'HTTP_USER_AGENT' => 'Capybara' })
end

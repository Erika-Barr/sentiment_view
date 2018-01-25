#Before('@javascript') do
#  Capybara.current_driver = :poltergeist
#end
#
#Before('@selenium') do
#  Capybara.current_driver = :selenium
#end
#
#After('@javascript or @selenium') do
#  Capybara.reset_sessions!
#  page.driver.quit if Capybara.current_driver == :selenium
#	Capybara.default_driver = :rack_test
#end

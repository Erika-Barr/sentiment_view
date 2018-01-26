Given /^I am on the index page$/ do
    visit "/"
end
Then /^I should see chart loaded about "(@.*)"$/ do |handle|
    page.assert_selector('.highcharts-anchor') 
    page.assert_text(:visible, "Chart loaded about @tastytrade")
end


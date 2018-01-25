Feature: User visits index page with javascript enabled
	In order to use application
  As a user
	I want to see index page

@javascript
Scenario: Find a default chart before searching 
	Given I am on the index page
  Then I should see chart loaded about "@tastytrade"


Feature: Do Stuff

				Scenario: Nothing happens with Javascript disbaled
								  Given I visit the home page
									  When I click "Where are they?!"
										  Then I should not see "I'm Batman."

				@javascript
				Scenario: Correct text is displayed with Javascript enabled
								  Given I visit the home page
									  When I click "Where are they?!"
										  Then I should see "I'm Batman."

Feature: Specify Number Of Events

Scenario: When user has not specified a number let 32 be the default number
Given the application has loaded
When a user hasn’t specified a number of events
Then the default number of events will be 32

Scenario: User can change the number of events they want to see
Given the default number of events have loaded
When a user can change the number of events displayed
Then the specified number of events will be displayed
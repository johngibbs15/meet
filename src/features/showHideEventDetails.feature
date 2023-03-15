Feature: As a user, I should be able to collapse and expand events so that I can view details for the selected event.

Scenario: An event element is collapsed by default
Given the application is loaded
When a user should receive a list of all events.
Then  the event information should not be visible.

Scenario: User can expand an event to see its details
Given the list of collapsed events have been loaded.
When a user should be able to expand an event item.
Then the event information should be visible

Scenario: User can collapse an event to hide its details
Given the event item is expanded and the event info is displayed
When a user should be able to collapse the event.
Then the event information should not be visible.
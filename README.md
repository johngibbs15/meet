# Meet App

## Objective

To build a serverless, progressive web application (PWA) with React using a
test-driven development (TDD) technique. The application uses the Google
Calendar API to fetch upcoming events

## Key Features

-   Filter events by city.
-   Show/hide event details.
-   Specify number of events.
-   Use the app when offline.
-   Add an app shortcut to the home screen.
-   View a chart showing the number of upcoming events by city

## Feature Scenarios

## FEATURE 1: FILTER EVENTS BY CITY

**User story**: As a user, I should be able to see a list of upcoming events from all cities and suggestions when searching for a city so that accessing important information is a smoother process.

**Scenario 1**: When user hasn’t searched for a city, show upcoming events from all cities.
Given: the application is loaded
When: a user hasn’t searched for a city
Then: upcoming events from all cities are displayed.

**Scenario 2**: User should see a list of suggestions when they search for a city.
Given: the search bar is being used
When: a user is searching for a city
Then: a list of suggestions are populated

**Scenario 3**: User can select a city from the suggested list.
Given: the suggested list has populated
When: a user can select a city from a suggested list
Then: event information can be viewed for that given city

## FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS

**User story**: As a user, I should be able to collapse and expand events so that I can view details for the selected event.

**Scenario 1**: An event element is collapsed by default
Given: the application is loaded
When: a user should receive a list of all events.
Then: the event information should not be visible.

**Scenario 2**: User can expand an event to see its details
Given: the list of collapsed events have been loaded.
When: a user should be able to expand an event item.
Then: the event information should be visible

**Scenario 3**: User can collapse an event to hide its details
Given: the event item is expanded and the event info is displayed
When: a user should be able to collapse the event.
Then: the event information should not be visible.

## FEATURE 3: SPECIFY NUMBER OF EVENTS

**User story**: As a user, I should be able to change the number of events returned so that I can decide how many events I want displayed.

**Scenario 1**: When user hasn’t specified a number, 32 is the default number
Given: the application has loaded
When: a user hasn’t specified a number of events
Then: the default number of events is 32

**Scenario 2**: User can change the number of events they want to see
Given: the default number of events have loaded
When: a user can change the number of events displayed
Then: the specified number of events are displayed

## FEATURE 4: USE THE APP WHEN OFFLINE

**User story**: As a user, I should be able to use the application offline so that an internet connection isn’t always needed to use the application.

**Scenario 1**: Show cached data when there’s no internet connection
Given: the application previously had internet connection
When: a user accesses the application with no internet connection
Then: cached data is displayed

Scenario 2: Show error when user changes the settings (city, time range)
Given: there is no internet connection
When: a user attempts to change the settings
Then: an error is displayed

## FEATURE 5: DATA VISUALIZATION

**User story**: As a user, I should be able to see the number of upcoming events in each city so that I can see when and where certain events are taking place

**Scenario 1**: Show a chart with the number of upcoming events in each city
Given: the data visualization feature is loaded
When: a user searches for a specific city
Then: event information for that city is loaded

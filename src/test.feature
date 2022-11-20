Feature: Making requests to API

Scenario: Using todo API GET functionality
    Given I called GET todo API
    Then the status code must be 200
    Then I should be received todos data via controller

Scenario: Using todo API POST functionality
    Given I add a todo via API
    Then the status code must be 201
    Then I should be received response of the data that I just added and ID of it
    
Scenario: Using todo API DELETE functionality
    Given I called DELETE todo with ID as the parameter
    Then the status code must be 200
    Then I should be received response as a array which had affected as 1 and raw as an empty array

    
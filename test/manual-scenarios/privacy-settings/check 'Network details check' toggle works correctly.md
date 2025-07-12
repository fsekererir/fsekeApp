# Security & Privacy Settings: Verify "Network details check" Toggle Functionality

Feature: Toggle "Network details check" in Security & Privacy Settings

In order to enhance user experience
As a user of the wallet extension
I want to toggle the "Network details check" option in the Security & Privacy Settings

Scenario Outline: Default state and toggle functionality of "Network details check"

Given I am on the Security & Privacy settings page
When I click on the "<state>" toggle icon
Then the toggle switch should visually indicate to "<expected_state>"

Examples:
| state         | expected_state |
| ON            | OFF            |
| OFF           | ON             |

Scenario Outline: Verification of network details check functionality when toggle is <toggle_state>

Given I am on the Security & Privacy settings page
And the "Network details check" toggle is set to "<toggle_state>"
When I navigate to the Networks tab
And I change <field_to_change>
Then <expected_behavior> appears below

Examples:
| toggle_state | field_to_change   | expected_behavior          |
| ON           | network name      | suggested name             |
| ON           | currency symbol   | suggested ticker           |
| OFF          | currency symbol   | verification unavailable  |

Scenario: Initial state of "Network details check" toggle is ON by default

Given I am in Settings
When I click on the "Security & Privacy" tab
Then the "Network details check" toggle is set to ON by default

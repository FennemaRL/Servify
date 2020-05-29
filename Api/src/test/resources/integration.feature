Feature: Cucumber integration

  Scenario: Keyboard smash
    Given A keyboard
    When I small the keyboard "1" time
    Then The keyboard is broke

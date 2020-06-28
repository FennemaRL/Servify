Feature: Recomendation

  Scenario: As a consumer I want to see the first 5 providers with the best global rating for their services
    Given A consumer
    And There are 6 providers with ratings and the first one is "Lucas" the second "Fran" the third "Ailin", the fourth "Nacho", the fifth "Pepita"
    When I want to see the first 5 providers with the best global rating
    Then I see providers "Lucas", "Fran", "Ailin", "Nacho", "Pepita"

  Scenario: As a consumer I want to see the first 5 providers with the best global rating for their services then I see no one
    Given A consumer
    When I want to see the first 5 providers with the best global rating
    Then I see no one
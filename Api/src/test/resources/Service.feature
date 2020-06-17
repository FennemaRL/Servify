Feature:  Services offer

  Scenario: List the categories
    Given A consumer
    When  Ask for the list of categories
    Then  Get the list of categories
    
  Scenario: Add Empty Calification
    Given A consumer
    And A specific service
    When calificate a specific service
    Then a calification is added to that service califications
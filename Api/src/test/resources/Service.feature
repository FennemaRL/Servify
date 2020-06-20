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
  
  Scenario: provider service with no calification average
    Given a service "Electricidad" of "Lucas" serviceProvider
    When i ask the average calification of a service that hasn't got any calification
    Then cero is returned
  
  Scenario: provider service with calification average
    Given a service "Electricidad" of "Lucas" serviceProvider
    When i ask the average calification of a service with some calification
    Then the average is returned
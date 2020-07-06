Feature:  Services offer

  Scenario: List the categories
    Given A consumer
    When  Ask for the list of categories
    Then  Get the list of categories
    
  Scenario: Add a Calification
    Given A serviceConsumer "Pepe" with an email "pepe@gmail.com"
    And A specific service
    When calificate a specific service with the message "Excelente servicio"
    Then a calification is added to that service califications
  
  Scenario: provider service with no calification average
    Given a service "Electricidad" of "Lucas" serviceProvider
    When i ask the average calification of a service that hasn't got any calification
    Then cero is returned
  
  Scenario: provider service with calification average
    Given a service "Electricidad" of "Lucas" serviceProvider
    When i ask the average calification of a service with some calification
    Then the average is returned

  Scenario: Like a review
    Given A specific review
    When I add a like to that review
    Then That review has one more like


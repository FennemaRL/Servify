Feature: Service Questions

  Scenario: Add a Question to a Service
    Given A consumer
    And A serviceProvider "Lucas" with Service "Plomeria"
    When I send the question "Envio gratis", with consumerName "Pepe", and mail  "PepitoAcade@gmail.com"  to  "Lucas" in the service "Plomeria"
    Then  The provider "Lucas" has a new question in the service "Plomeria"

  Scenario: Trying to add a Question to a Service without question
    Given A consumer
    And A serviceProvider "Lucas" with Service "Plomeria"
    When I send the question "", with consumerName "Pepe", and mail  "PepitoAcade@gmail.com"  to  "Lucas" in the service "Plomeria"
    Then  The provider "Lucas" don't have a new question in the service "Plomeria"

  Scenario: Trying to add a Question to a Service without consumerName
    Given A consumer
    And A serviceProvider "Lucas" with Service "Plomeria"
    When I send the question "Envio gratis", with consumerName "", and mail  "PepitoAcade@gmail.com"  to  "Lucas" in the service "Plomeria"
    Then  The provider "Lucas" don't have a new question in the service "Plomeria"

  Scenario: Trying to add a Question to a Service without mail
    Given A consumer
    And A serviceProvider "Lucas" with Service "Plomeria"
    When I send the question "Envio gratis", with consumerName "Pepe", and mail  ""  to  "Lucas" in the service "Plomeria"
    Then  The provider "Lucas" don't have a new question in the service "Plomeria"
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


  Scenario: Answer a question in a service
    Given A serviceProvider "Lucas" with Service "Plomeria"
    And I send the question "Envio gratis", with consumerName "Pepe", and mail  "PepitoAcade@gmail.com"  to  "Lucas" in the service "Plomeria"
    When I answer the question "Envio gratis" in service "Plomeria" with "All the nait vieja no me para ni el covid"
    Then The provider "Lucas" in the service "Plomeria" in the question "Envio gratis" has the answer "All the nait vieja no me para ni el covid"

  Scenario: Response a question in a service
    Given A serviceProvider "Lucas" with Service "Plomeria"
    And I send the question "Envio gratis", with consumerName "Pepe", and mail  "PepitoAcade@gmail.com"  to  "Lucas" in the service "Plomeria"
    Then I answer the question "Envio gratis" in service "Plomeria" with "" throw Error "la respuesta no puede estar vacia"

  Scenario: Response a non existent question in a service
    Given A serviceProvider "Lucas" with Service "Plomeria"
    And I send the question "Envio gratis", with consumerName "Pepe", and mail  "PepitoAcade@gmail.com"  to  "Lucas" in the service "Plomeria"
    Then I answer the question "Envio gratis pa" in service "Plomeria" with "" throw Error "El servicio Plomeria no tiene la pregunta Envio gratis pa"


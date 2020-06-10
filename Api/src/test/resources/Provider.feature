Feature: Service Provider

  Scenario: Add a service
    Given A serviceProvider "Lucas"
    When  I add the service "Plomeria"
    Then  I provide the service "Plomeria"

  Scenario: Add a service repeated
    Given A serviceProvider "Lucas"
    When  I add the service "Plomeria"
    Then  I add the service "Plomeria" and throw "Error: Servicio ya provisto"

  Scenario: Delete a service repeated
    Given A serviceProvider "Lucas"
    When  I add the service "Plomeria"
    Then  I delete the service "Plomeria"

  Scenario: Delete a service repeated
    Given A serviceProvider "Lucas"
    Then  I delete the service "Plomeria"
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

  Scenario: Add a description to a service
    Given A serviceProvider "Lucas"
    When I add the service "Plomeria"
    And I add a description "Cash Only" to the service "Plomeria"
    Then That description "Cash Only" is in the service "Plomeria"

  Scenario: Add a description to a service
    Given A serviceProvider "Lucas"
    When I add the service "Plomeria"
    Then I add a description "" to the service "Plomeria" and throw "Error: Descripción vacía"

  Scenario: Add a description to a non existent service
    Given A serviceProvider "Lucas"
    When I add the service "Plomeria"
    Then I add a description "Cash Only" to the service "Electricidad" and throw "Error: Servicio no provisto"
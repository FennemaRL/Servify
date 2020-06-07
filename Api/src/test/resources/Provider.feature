Feature: Service Provider

  Scenario: Add a service
    Given A serviceProvider "Lucas"
    When  I add the service "Plomeria"
    Then  I provide the service "Plomeria"
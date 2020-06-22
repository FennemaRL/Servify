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

  Scenario: Add personal information to provider
    Given A serviceProvider "Pepe"
    When I modify personal information
    Then That information is in Pepe's profile

  Scenario: Add personal incompleted information to provider
    Given A serviceProvider "Pepe"
    When I modify personal information leaving one empty field
    Then I don't add any information and i throw "Error: No puede dejar campos vacios"

  Scenario: Add a description to a non existent service
    Given A serviceProvider "Lucas"
    When I add the service "Plomeria"
    Then I add a description "Cash Only" to the service "Electricidad" and throw "Error: Servicio no provisto"

  Scenario: Add the scope area to a service
    Given A serviceProvider "Pepa"
    When I add the service "Plomeria"
    And I add the scope area "CABA" to the service "Plomeria"
    Then The scope area "CABA" is in the service "Plomeria"

  Scenario: Login with username and password
    Given A serviceProvider with user "Lucas" and password "123456"
    When I login with user "Lucas" and password "123456"
    Then I login

  Scenario: Login with username or password are incorrect
    Given A serviceProvider with user "Lucas" and password "123456"
    When I login with user "Lucas" and password "010101"
    Then I do not log in


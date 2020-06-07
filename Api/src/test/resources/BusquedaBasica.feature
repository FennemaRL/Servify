Feature:  Busqueda Basica por Categoria
  
  Scenario: List of people who offer plomeria services
    Given A consumer
    When  Searchs using category basic search for plomeria service
    Then  Get the list of people who offer that service
  
  Scenario: Empty list of people who offer plomeria services
    Given A consumer
    When  Searchs using category basic search for gas natural service
    Then  Get an empty list of people who offer gas natural services
  
  Scenario: Error is throwed as churrero is not a valid service category
    Given A consumer
    When  Searchs using category basic search for churrero service
    Then  An Error is thrown
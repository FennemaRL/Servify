Feature:  Busqueda Basica por Categoria
  
  Scenario: List of people who offer plomeria services in any zone
    Given A consumer
    And A provider list of servify application
    When  Searchs using category and zone search for "Plomeria" in ""
    Then  Get the list of people who offer "Plomeria" in ""
  
  Scenario: Empty list of people who offer gas natural services
    Given A consumer
    And A provider list of servify application
    When  Searchs using category and zone search for "Gas Natural" in ""
    Then  Get an empty list of people who offer "Gas Natural" in ""
  
  Scenario: Error is throwed as churrero is not a valid service category
    Given A consumer
    And A provider list of servify application
    When  Searchs using category and zone search for "Churrero" in ""
    Then  An Error is thrown
  
  Scenario: List of people who offer plomeria services in that zone
    Given A consumer
    And A provider list of servify application
    When Searchs using category and zone search for "Plomeria" in "CABA"
    Then Get the list of people who offer "Plomeria" in "CABA"
  
  Scenario: Error is throwed as both fields were empties
    Given A consumer
    And A provider list of servify application
    When Searchs using category and zone search for "" in ""
    Then An Error is thrown
  
  Scenario: Error is throwed as category field was empty
    Given A consumer
    And A provider list of servify application
    When Searchs using category and zone search for "" in "CABA"
    Then An Error is thrown
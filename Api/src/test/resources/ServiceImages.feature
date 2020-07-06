Feature:  Service images Manupulation

  Scenario: Service visualize the images in a service with no images
    Given A serviceProvider "Lucas" with "Plomeria" as a service
    When Select the service "Plomeria" of "Lucas"
    Then I see nothing

  Scenario: Add a image To a service
    Given A serviceProvider "Lucas" with "Plomeria" as a service
    And I add a image "pepe" type "png" in "Plomeria" of "Lucas"
    When Select the service "Plomeria" of "Lucas"
    Then I see a one image

  Scenario: Add a Wrong image To a service
    Given A serviceProvider "Lucas" with "Plomeria" as a service
    And I add a image "pepe" type "png1" in "Plomeria" of "Lucas"
    When Select the service "Plomeria" of "Lucas"
    Then trow error "Error : la imagen No puede de ser de otro tipo que png o jpg"

  Scenario: Add a repeated image To a service
    Given A serviceProvider "Lucas" with "Plomeria" as a service
    And I add a image "pepe" type "png" in "Plomeria" of "Lucas"
    And I add a image "pepe" type "png" in "Plomeria" of "Lucas"
    When Select the service "Plomeria" of "Lucas"
    Then trow error "Error : no pueden haber 2 imagenes con el mismo nombre y tipo"

  Scenario: Remove A non existent image
    Given A serviceProvider "Lucas" with "Plomeria" as a service
    And I add a image "pepe" type "png" in "Plomeria" of "Lucas"
    And I delete the image "pepe1" type "png" in "Plomeria" of "Lucas"
    When Select the service "Plomeria" of "Lucas"
    Then I see a one image

  Scenario: Remove A existent image
    Given A serviceProvider "Lucas" with "Plomeria" as a service
    And I add a image "pepe" type "png" in "Plomeria" of "Lucas"
    And I delete the image "pepe" type "png" in "Plomeria" of "Lucas"
    When Select the service "Plomeria" of "Lucas"
    Then I see nothing

